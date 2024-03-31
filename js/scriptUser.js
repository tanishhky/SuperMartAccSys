const today = new Date().toISOString().split('T')[0];
document.getElementById("finEndDate").setAttribute("max", today);
