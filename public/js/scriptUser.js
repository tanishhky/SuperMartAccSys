// const { doc } = require("firebase/firestore");

const today = new Date().toISOString().split('T')[0];
document.getElementById("finEndDate").setAttribute("max", today);
document.getElementById("dobNewUser").setAttribute("max", today);
document.getElementById("finEndDate").setAttribute("max", today);
document.getElementById("finStartDate").setAttribute("max", today);

window.onload = function() {
    var userDetsString=localStorage.getItem('currentUserDetails');
    console.log(userDetsString);
    var userDets=JSON.parse(userDetsString);
    console.log(userDets);
    // Check if "xyz" exists in local storage
    if (userDets[0].role=="Store Manager") {
        SMView();
    } else if(userDets[0].role=="Accountant"){
        AView();
    } else if(userDets[0].role=="Cashier"){
        CView();
    }
    hideAndUnhide();
    updateUserDetails(userDets[0]);
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
    removeAddUser();
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

function validatenewuserDOB(){
    var dob=document.getElementById('dobNewUser').value;
    var validationMessage = document.getElementById("invalidDOB");
    if(dob!=''){
        validationMessage.innerText="";
        return dob;
    } else{
        validationMessage.innerHTML="PLEASE ENTER YOUR DATE-OF-BIRTH";
    }

}

function isValidName(name) {
    if (name.length > 0 && name.length <= 50) {
        return /^[a-zA-Z\s'-]+$/.test(name);
    } else {
        return false;
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

function updateUserDetails(userDets){
    document.getElementById("empName").innerText=userDets.name;
    document.getElementById("designation").innerText=userDets.role;
    document.getElementById("empID").innerText=userDets.username;
    document.getElementById("empJoinDate").innerText=convertDateFormat(userDets.datejoined);
    document.getElementById("empAge").innerText=calculateAge(userDets.dateofbirth);
    document.getElementById("empGender").innerText=userDets.gender;
    document.getElementById("empBranch").innerText=userDets.branch;
    document.getElementById("empPhone").innerText=userDets.phone;
    document.getElementById("empemail").innerText=userDets.email;
}

function convertDateFormat(dateString) {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getUTCFullYear();
    const newDateFormat = `${day}-${month}-${year}`;

    return newDateFormat;
}
function convertDateFormatToPush(inputDate) {
    // Split the input date string into day, month, and year components
    var parts = inputDate.split('-');
    var day = parseInt(parts[0]);
    var month = parseInt(parts[1]) - 1; // Months in JavaScript are 0-based (January is 0)
    var year = parseInt(parts[2]);

    // Create a new Date object with the parsed components
    var date = new Date(year, month, day);

    // Adjust the time to 18:30:00
    date.setUTCHours(0);
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);

    // Format the date string in ISO 8601 format
    var formattedDate = date.toISOString();

    return formattedDate;
}

// Example usage:
var inputDate = "19-03-2024";
var convertedDate = convertDateFormat(inputDate);
console.log(convertedDate); // Output: "2024-03-19T18:30:00.000Z"


function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const currentDate = new Date();
    let age = currentDate.getUTCFullYear() - birthDate.getUTCFullYear();
    if (currentDate.getUTCMonth() < birthDate.getUTCMonth() ||
        (currentDate.getUTCMonth() === birthDate.getUTCMonth() && currentDate.getUTCDate() < birthDate.getUTCDate())) {
        age--;
    }

    return age;
}

function isValidEmail(email) {
    // Basic email validation using a regular expression
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log("email",emailRegex.test(email));
    return emailRegex.test(email);
}

function isValidPhoneNumber(phone) {
    // Basic phone number validation: 10 digits
    var phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}

function validateRole(){
    let roleInput=document.getElementById('addRole').value;
    let roleInputValidationMsg=document.getElementById('roleInvalid')
    if(roleInput==''){
        roleInputValidationMsg.innerText="SELECT A ROLE";
        console.log('role empty');
        return false;
    }
    else{
        console.log('role full');
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
        console.log('gender f');
        return 'Female';
    }
    else if(genInputM.checked){
        console.log('gender m');
        return 'Male';
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

async function addUserToDB(){
    console.log("addtouserdb");
    if(validateName() && validateRole() && validateGender() && validatePhoneNumber() && validateEmail(),validatenewuserDOB()){
        console.log("addtouserdb");
        document.getElementById('addUsers').innerText="Adding User...";
        const name=document.getElementById('newUserFullName').value;
        const gender=validateGender();
        const dob=validatenewuserDOB();
        const email=document.getElementById('newUserEmail').value;
        const phoneNum=document.getElementById('phoneNumber').value;
        const branch=document.getElementById('newUserBranch').value;
        const role=document.getElementById('addRole').value;
        const datejoined=convertDateFormatToPush(convertDateFormat(new Date()));

        console.log(name,gender,dob,email,phoneNum,branch,role,datejoined);

        const detailsUploadStatus = await addNewUserDetails(name,gender,dob,email,phoneNum,branch,role,datejoined);
    }
}

const addNewUserDetails = async (name,gender,dob,email,phoneNum,branch,role,datejoined) => {
	const response = await fetch("http://localhost:3000/api/sm/adduser", {
		method: "POST",
		headers: {
			name : name, 
            gender : gender, 
            dob : dob, 
            email : email, 
            phone : phoneNum, 
            branch : branch, 
            role : role, 
            datejoined : datejoined
		},
	});
    const res = await response.json()
    document.getElementById('addUsers').innerText="USER ADDED SUCCESSFULLY";
};

//Creating generate Financial Report

function formatDateForPostgres(date) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const days = [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate().toString().padStart(2, '0');
    const dayOfWeek = days[date.getDay()];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const timezoneOffset = date.getTimezoneOffset();
    const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffset / 60)).toString().padStart(2, '0');
    const timezoneOffsetMinutes = Math.abs(timezoneOffset % 60).toString().padStart(2, '0');
    const timezone = timezoneOffset >= 0 ? '-' : '+';

    return `${dayOfWeek} ${month} ${dayOfMonth} ${year} ${hours}:${minutes}:${seconds} GMT${timezone}${timezoneOffsetHours}${timezoneOffsetMinutes} (${Intl.DateTimeFormat().resolvedOptions().timeZone})`;
}

async function fetchFinancialReport(){
    const startDate=document.getElementById('finStartDate').value;
    const endDate=document.getElementById('finEndDate').value;
    if(startDate==''){
        document.getElementById('errorStart').innerText="ENTER START DATE";
        return;
    }
    if(endDate==''){
        document.getElementById('errorEnd').innerText="ENTER END DATE";
        return;
    }
    document.getElementById('generatereportbtn').innerText='FETCHING DETAILS'
    const detailsUploadStatus = await addNewUserDetails(formatDateForPostgres(startDate),formatDateForPostgres(endDate));
}

const getFinancesFromDB = async (startDate,endDate) => {
	const response = await fetch("http://localhost:3000/api/finstats", {
		method: "GET",
		headers: {
			startDate : startDate, 
            endDate : endDate
		},
	});
    const data = await response.json();
    console.log(res);
    if (data.length==0){
        document.getElementById('generatereportbtn').innerText="NO DATA FOR THE DATE RANGE";
        return 0;
    }else{
        document.getElementById('generatereportbtn').innerText="REPORT GENERATED SUCCESSFULLY";
        return data;
    }
};

// Creating Add Item
function addItemQuantity(){
    const quantity=document.getElementById('addItemQuantity').value;
    const totalPrice=document.getElementById('valueAdded');
    const errormsg=document.getElementById('errormsg');
    if(quantity>0){
        const totPrice=document.getElementById('addItemPrice').value*quantity;
        totalPrice.innerText=totPrice;
        return totPrice;
    }
    else{
        errormsg.innerText="QUANTITY CAN NOT BE LESS THAN 1";
        return false;
    }
}

async function addItemToDB(){
    const itemID = document.getElementById('addItemID').value;
    const itemQuantity = document.getElementById('addItemQuantity').value;
    const itemPrice = document.getElementById('addItemPrice').value;
    const itemName = document.getElementById('addItemName').value;

    console.log(itemID,itemQuantity,itemName,itemPrice);
    document.getElementById('addInventoryItems').innerText="UPLOADING...";
    const detailsUploadStatus = await putItemsToDB(itemID,itemQuantity,itemName,itemPrice);
}

const putItemsToDB = async(itemID,itemQuantity,itemName,itemPrice)=>{
    const response = await fetch("http://localhost:3000/api/addItem", {
		method: "POST",
		headers: {
            product_id: itemID,
            product_name:itemName,
            product_price:itemPrice,
            product_quantity:itemQuantity
		},
	});
    const res = await response.json()
    document.getElementById('addInventoryItems').innerText="ITEM ADDED SUCCESSFULLY";
}


// Creting SEE INVENTORY
async function fetchData() {
    try {
      const response = await fetch("http://localhost:3000/api/inventory");
      const data = await response.json();
      const tableBody = document.getElementById("inventoryData");

      data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.product_id}</td>
          <td>${item.product_name}</td>
          <td>${item.product_description}</td>
          <td>${item.product_price}</td>
          <td>${item.product_quantity}</td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
