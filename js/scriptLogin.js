window.addEventListener('DOMContentLoaded', function() {
    // Get references to the scrollable and content divs
    // console.log("in fnctn");
    var scrollableDiv = document.getElementById("instructions");
    var contentDiv = document.getElementById("loginArea");
    // console.log("took obj");
    // Set the height of the scrollable div to match the height of the content div
    scrollableDiv.style.height = contentDiv.offsetHeight-40 + "px";
    // console.log("hieght set",scrollableDiv.style.height,contentDiv.offsetHeight);
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

function validateLoginCreds(){
    if(validateUsername()&&validatePassword()&&validateRole()){
        document.getElementById("logincredsub").innerText="Validating User...";
    }
}

// validateLogin()