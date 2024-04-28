// const { doc } = require("firebase/firestore");

window.addEventListener("DOMContentLoaded", function () {
    this.localStorage.clear();
	var scrollableDiv = document.getElementById("instructions");
	var contentDiv = document.getElementById("loginArea");
	scrollableDiv.style.height = contentDiv.offsetHeight - 40 + "px";

    var submitBtn=this.document.getElementById("logincredsub");
    var usernameF=this.document.getElementById("username");
    var passwordF=this.document.getElementById("password");

    usernameF.style.width=passwordF.style.width=submitBtn.style.width;
});

function isValidUsername(username) {
	const alphanumericRegex = /^[a-zA-Z0-9]+$/;

	return alphanumericRegex.test(username);
}

function isValidEmail(email) {
    // Basic email validation using a regular expression
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhoneNumber(phone) {
    // Basic phone number validation: 10 digits
    var phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}


function isValidName(name) {
    if (!name || name.trim() === '') {
        return false;
    }
    if (!/^[a-zA-Z]+$/.test(name)) {
        return false;
    }
    if (name.length > 50) {
        return false;
    }

    return true;
}

function validateName(){
    var name=document.getElementById('newUserFullName');
    if(isValidName(name.value)){
        return true;
    }
    else{
        document.getElementById('nameInvalid').innerText="ENTER VALID NAME";
        return false;
    }
}
function validateRole(){
    let roleInput=document.getElementById('addRole').value;
    let roleInputValidationMsg=document.getElementById('roleInvalid')
    if(roleInput==''){
        roleInputValidationMsg.innerText="SELECT A ROLE";
        return false;
    }
    else{
        return true;
    }
}

function validateGender(){
    let genInputM=document.getElementById('gendernewusermale');
    let genInputF=document.getElementById('gendernewuserfemale');
    let genInputError=document.getElementById('genderInvalid');

    if (!genInputM.checked && !genInputF.checked) {
        genInputError.innerText="PLEASE SELECT A GENDER";
        return false;
    }
    else if (genInputF.checked) {
        return gender;
    }
}

function validatePhoneNumber(){
    let validationMsg=document.getElementById('phoneInvalid')
    if(isValidPhoneNumber(document.getElementById('phoneNumber').value)){
        return true;
    }
    else{
        validationMsg.innerText="PLEASE WRITE A VALID PHONE NUMBER";
        return false;
    }
}

function validateEmail(){
    var validationMsg=document.getElementById('emailInvalid');
    if(isValidEmail(document.getElementById('newUserEmail').value)){
        return true;
    }
    else{
        validationMsg.innerText="PLEASE ENTER VALID EMAIL";
        return false;
    }
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

	if ((passwordInput.value)!='') {
		validationMessage.innerText = "";
		return true;
	} else {
		validationMessage.innerText = "Invalid Password";
		return false;
	}
}


async function validateLoginCreds() {
	if (validateUsername() && validatePassword()) {
		document.getElementById("logincredsub").innerText = "Validating User...";
        const username=document.getElementById("username").value;
        const password=document.getElementById("password").value;
        console.log(username,password);
        const currentUserDetailsJSON=await fetchDetails(username,password);
        console.log("h",currentUserDetailsJSON[0]);
        if(currentUserDetailsJSON==0){
            alert("Incorrect USERNAME or PASSWORD");
            // return;
        }
		localStorage.setItem("currentUserDetails", JSON.stringify(currentUserDetailsJSON));
        if(currentUserDetailsJSON[0].role=="Store Manager" || currentUserDetailsJSON[0].role=="Accountant" || currentUserDetailsJSON[0].role=="Cashier"){
            window.location.href = "user.html";
        }
        else{
            document.getElementById('logincredsub').innerText="Login"
        }
	}
}

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
