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
    hideInactiveDivs();
};

function hideInactiveDivs() {
    var inactiveDivs = document.getElementsByClassName('inactiveView');

    for (var i = 0; i < inactiveDivs.length; i++) {
        inactiveDivs[i].style.display = 'none';
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