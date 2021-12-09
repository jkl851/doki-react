function openNav() {
  document.getElementById("mySidenav").style.width = "400px";
  document.getElementById("whole_wrapper").style.marginRight = "0";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("whole_wrapper").style.marginRight = "0";
}

// function openMessage() {
//   document.getElementById("message-list").style.width = "400px";
//   document.getElementById("whole_wrapper").style.marginRight = "0";
// }

// function closeMessage() {
//   document.getElementById("message-list").style.width = "0";
//   document.getElementById("whole_wrapper").style.marginRight = "0";
// }

export { openNav, closeNav };
