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

function removeAddItem(){
    document.getElementById("AddItem").style.display='none';
    document.getElementById("additemmodule").style.display='none';
}

function removeAddSale(){
    document.getElementById("AddSale").style.display='none';
    // document.getElementById()
}

function removeAddRefund(){
    document.getElementById("AddRefund").style.display='none';
}

function setActive(event, view) {
    console.log(view);
    var clickedID = event.target.id; // Get the ID of the clicked element
    document.getElementsByClassName('active')[0].classList.remove('active'); // Get all elements with 'activeView' class
    document.getElementsByClassName('activeView')[0].classList.add('inactiveView');
    document.getElementsByClassName('activeView')[0].classList.remove('activeView');

    // Loop through all elements with 'activeView' class and remove the class
    // for (var i = 0; i < elementsNav.length; i++) {
    //     elementsNav[0].classList.remove('active');
    // }

    // for (var i = 0; i < elementsBody.length; i++) {
    //     console.log(i);
    //     elementsBody[i].classList.remove('activeView');
    //     elementsBody[i].classList.add('inactiveView'); // Add the 'inactiveView' class
    // }

    // Add 'activeView' class to the clicked element
    document.getElementById(clickedID).classList.add('active');
    document.getElementById(view).classList.remove('inactiveView'); // Remove the 'inactiveView' class
    document.getElementById(view).classList.add('activeView');
    hideAndUnhide();
}


