window.addEventListener('DOMContentLoaded', function() {
    // Get references to the scrollable and content divs
    console.log("in fnctn");
    var scrollableDiv = document.getElementById("instructions");
    var contentDiv = document.getElementById("loginArea");
    console.log("took obj");
    // Set the height of the scrollable div to match the height of the content div
    scrollableDiv.style.height = contentDiv.offsetHeight-40 + "px";
    console.log("hieght set",scrollableDiv.style.height,contentDiv.offsetHeight);
});
