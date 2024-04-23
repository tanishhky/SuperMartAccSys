window.addEventListener("DOMContentLoaded", function () {
	var scrollableDiv = document.getElementById("instructions");
	var contentDiv = document.getElementById("loginArea");
	scrollableDiv.style.height = contentDiv.offsetHeight - 40 + "px";

    var submitBtn=this.document.getElementById("logincredsub");
    var usernameF=this.document.getElementById("username");
    var passwordF=this.document.getElementById("password");

    console.log(usernameF.style.width,passwordF.style.width,submitBtn.style.width);
    usernameF.style.width=passwordF.style.width=submitBtn.style.width;
    console.log(usernameF.style.width,passwordF.style.width,submitBtn.style.width);
});

function isValidUsername(username) {
	const alphanumericRegex = /^[a-zA-Z0-9]+$/;

	return alphanumericRegex.test(username);
}
function isValidPassword(password) {
	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

	return passwordRegex.test(password);
}

function validateUsername() {
	var usernameInput = document.getElementById("username");
	var validationMessage = document.getElementById("usernameInvalid");

	if (isValidUsername(usernameInput.value)) {
		validationMessage.innerText = "";
		return true;
	} else {
		validationMessage.innerText = "Invalid Username";
		return false;
	}
}

function validatePassword() {
	var passwordInput = document.getElementById("password");
	var validationMessage = document.getElementById("passwordInvalid");

	if (isValidPassword(passwordInput.value)) {
		validationMessage.innerText = "";
		return true;
	} else {
		validationMessage.innerText = "Invalid Password";
		return false;
	}
}

// function validateRole() {
// 	var roleSelect = document.getElementById("role");
// 	var validationMessage = document.getElementById("roleInvalid");
// 	if (roleSelect != "") {
// 		validationMessage.innerText = "";
// 		return true;
// 	} else {
// 		validationMessage.innerText = "Kindly select your role.";
// 		return false;
// 	}
// }
async function validateLoginCreds() {
	if (validateUsername() && validatePassword()) {
		document.getElementById("logincredsub").innerText = "Validating User...";
        const username=document.getElementById("username").value;
        const password=document.getElementById("password").value;
        console.log(username,password);
        const details=await fetchDetails(username,password);
        if(details==0){
            alert("Incorrect USERNAME or PASSWORD");
            return;
        }
		localStorage.setItem("currentUserDetails", details);
		window.location.href = "user.html";
	}
}

// validateLogin()

const fetchDetails = async (username, password) => {
    console.log("fetching",username,password);
	const response = await fetch("http://localhost:3000/api/user/login", {
		method: "GET",
		headers: {
			username: username,
			password: password,
		},
	});
	const data = await response.json();
    if (data.length==0){
        return 0;
    }else{
        return data;
    }
};
