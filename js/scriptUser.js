const today = new Date().toISOString().split('T')[0];
document.getElementById("finEndDate").setAttribute("max", today);

window.onload = function() {
    var userType=localStorage.getItem("userType");
    // Check if "xyz" exists in local storage
    if (userType=="SM") {
        SMView();
    } else if(userType=="A"){
        Aview();
    } else if(userType=="C"){
        Cview();
    }
    hideAndUnhide();
};

window.addEventListener('DOMContentLoaded', function() {
    var scrollableDiv = document.getElementById("pfpImg");
    var contentDiv = document.getElementById("profileDets");
    console.log("took obj");
    // Set the height of the scrollable div to match the height of the content div
    scrollableDiv.style.height = contentDiv.offsetHeight - 52 + "px";
    console.log("hieght set",scrollableDiv.style.height,contentDiv.offsetHeight);
});

function hideAndUnhide() {
    var inactiveDivs = document.getElementsByClassName('inactiveView');
    var activeDivs=document.getElementsByClassName('activeView');

    for (var i = 0; i < inactiveDivs.length; i++) {
        inactiveDivs[i].style.display = 'none';
    }
    for (let i = 0; i < activeDivs.length; i++) {
        activeDivs[i].style.display=''
    }
}


function SMView(){
    removeAddItem();
    removeAddSale();
    removeAddRefund();
}

function CView(){
    removeAddUser();
    removeFinancialReport();
    removeInventory();
}
function AView(){
    removeAddItem();
    removeAddSale();
    removeAddRefund();
}

function removeAddItem(){
    document.getElementById("AddItem").style.display='none';
}

function removeAddSale(){
    document.getElementById("AddSale").style.display='none';
    // document.getElementById()
}

function removeAddRefund(){
    document.getElementById("AddRefund").style.display='none';
}

function removeAddUser(){
    document.getElementById("AddUser").style.display='none';
}

function removeFinancialReport(){
    document.getElementById("FinancialReport").style.display='none';
}

function removeInventory(){
    document.getElementById('SeeInventory').style.display='none';
}

function setActive(event, view) {
    var clickedID = event.target.id; // Get the ID of the clicked element
    document.getElementsByClassName('active')[0].classList.remove('active'); // Get all elements with 'activeView' class
    document.getElementsByClassName('activeView')[0].classList.add('inactiveView');
    document.getElementsByClassName('activeView')[0].classList.remove('activeView');

    document.getElementById(clickedID).classList.add('active');
    document.getElementById(view).classList.remove('inactiveView'); // Remove the 'inactiveView' class
    document.getElementById(view).classList.add('activeView');
    hideAndUnhide();
}

function logoutandclearstorage(){
    localStorage.clear();
    sessionStorage.clear()
    window.location.href = "index.html";
}

function validateEmail() {
    var emailInput = document.getElementById("newUserEmail");
    var validationMessage = document.getElementById("emailInvalid");
    var email = emailInput.value;

    if (isValidEmail(email)) {
        console.log('valid');
        validationMessage.innerText = "";
        return true;
    } else {
        console.log('invalid');
        validationMessage.innerText = "Invalid email address";
        return false;
    }
}

function isValidEmail(email) {
    return /^[a-zA-Z0-9_]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatenewuserrole(){
    var role=document.getElementById('addRole').value;
    var validationMessage = document.getElementById("roleInvalid");
    if(role!=''){
        validationMessage.innerText="";
    } else{
        validationMessage.innerHTML="Please select the role to be assigned";
    }

}

function isValidName(name) {
    if (name.length > 0 && name.length <= 50) {
        return /^[a-zA-Z\s'-]+$/.test(name);
    } else {
        return false; // Return false if the name is empty or exceeds 50 characters
    }
}

function validateName() {
    var nameInput = document.getElementById("newUserFullName");
    var validationMessage = document.getElementById("nameInvalid");

    if (isValidName(nameInput.value)) {
        validationMessage.innerText = "";
        return true;
    } else {
        validationMessage.innerText = "Invalid Name";
        return false;
    }
}

// function validateGender(){
//     if
// }

function validateNewUserEntry(){
    if(validateName()&&validatenewuserrole()&&validateGender()&&validatePhoneNumber()&&validateEmail()){

    }
}