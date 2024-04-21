window.addEventListener('DOMContentLoaded', function() {
    var scrollableDiv = document.getElementById("instructions");
    var contentDiv = document.getElementById("loginArea");
    scrollableDiv.style.height = contentDiv.offsetHeight-40 + "px";
});

function isValidUsername(username) {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;

    return alphanumericRegex.test(username);
}
function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

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

function validatePassword(){
    var  passwordInput = document.getElementById("password");
    var validationMessage = document.getElementById("passwordInvalid");

    if (isValidPassword(passwordInput.value)) {
        validationMessage.innerText="";
        return true;
    } else {
        validationMessage.innerText="Invalid Password";
        return false;
    }
}

function validateRole(){
    var roleSelect=document.getElementById("role");
    var validationMessage=document.getElementById("roleInvalid");
    if(roleSelect!=''){
        validationMessage.innerText="";
        return true;
    } else{
        validationMessage.innerText="Kindly select your role.";
        return false;
    }
}
function validateLoginCreds() {
    if (validateUsername() && validatePassword() && validateRole()) {
        document.getElementById("logincredsub").innerText = "Validating User...";
        localStorage.setItem("userType", "A");
        window.location.href = "user.html";
    }
}

// validateLogin()