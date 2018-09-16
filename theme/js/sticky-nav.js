 
window.onscroll = function() {stickyNav()};

var header = document.getElementsByTagName("header");

// Add the sticky class to the nav when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyNav() {
  if (window.pageYOffset >= 280) {
    header[0].classList.add("sticky");
  } else {
    header[0].classList.remove("sticky");
  }
}