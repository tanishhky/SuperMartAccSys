const express = require("express");
const { Pool } = require("pg");
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// Create a new PostgreSQL connection pool
const pool = new Pool({
	connectionString:
		"postgres://default:P6dATomJipZ3@ep-fragrant-sea-68067357-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
	ssl: {
		rejectUnauthorized: false,
	},
});

// Function to generate a random password
function generateRandomPassword() {
	const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
	const numbers = "0123456789";
	const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

	const allChars = uppercaseChars + lowercaseChars + numbers + symbols;

	let password = "";
	password += uppercaseChars.charAt(
		Math.floor(Math.random() * uppercaseChars.length)
	);
	password += lowercaseChars.charAt(
		Math.floor(Math.random() * lowercaseChars.length)
	);
	password += numbers.charAt(Math.floor(Math.random() * numbers.length));
	password += symbols.charAt(Math.floor(Math.random() * symbols.length));

	for (let i = 4; i < 8; i++) {
		password += allChars.charAt(Math.floor(Math.random() * allChars.length));
	}

	// Shuffle the password characters
	password = password
		.split("")
		.sort(() => Math.random() - 0.5)
		.join("");

	return password;
}

// Define a route to fetch data from the "users" table
app.get("/api/user/login", async (req, res) => {
	try {
		console.log("in");
		const { username, password } = req.headers;
		const query = {
			text: "SELECT * FROM users WHERE username = $1 AND password = $2",
			values: [username, password],
		};
		const { rows } = await pool.query(query);
		res.json(rows);
	} catch (error) {
		console.error("Error executing query:", error);s
		res.status(500).json({ error: "Error executing query" });
	}
});

// Define a route to add a new user
app.post("/api/sm/adduser", async (req, res) => {
	try {
		// console.log("got in");
		const { name, gender, dob, email, phone, branch, role, datejoined } =
			req.headers;

		// Convert the date strings to valid SQL TIMESTAMP format
		const dobTimestamp = new Date(dob)
			.toISOString()
			.replace("T", " ")
			.replace("Z", "");
		const datejoinedTimestamp = new Date(datejoined)
			.toISOString()
			.replace("T", " ")
			.replace("Z", "");

		// Find the highest existing username
		const highestUsernameQuery =
			"SELECT MAX(username) AS max_username FROM users";
		const {
			rows: [{ max_username }],
		} = await pool.query(highestUsernameQuery);

		// Increment the highest username to generate the next username
		const nextUsername = max_username ? max_username + 1 : 1;

		// Generate a random password
		const password = generateRandomPassword();

		const query = {
			text: "INSERT INTO users(username, name, gender, dateofbirth, email, phone, branch, role, datejoined, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
			values: [
				nextUsername,
				name,
				gender,
				dobTimestamp,
				email,
				phone,
				branch,
				role,
				datejoinedTimestamp,
				password,
			],
		};

		await pool.query(query);
		res.status(200).json({ message: "User added successfully" });
	} catch (error) {
		console.error("Error adding the member:", error);
		res.status(500).json({ error: "Error adding the member" });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
