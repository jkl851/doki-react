function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function myFunction2() {
  document.getElementById("myDropdown2").classList.toggle("show");
}

function myFunction3() {
  document.getElementById("myDropdown").classList.toggle("hide");
}

function myFunction4() {
  document.getElementById("myDropdown2").classList.toggle("hide");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  // div = document.getElementById("myDropdown2");
  // a = div.getElementsByTagName("a");
  // for (i = 0; i < a.length; i++) {
  //   txtValue = a[i].textContent || a[i].innerText;
  //   if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //     a[i].style.display = "";
  //   } else {
  //     a[i].style.display = "none";
  //   }
  // }
}

export {myFunction, myFunction2, myFunction3, myFunction4, filterFunction }