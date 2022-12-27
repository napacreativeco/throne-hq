/*
 * Burger
 */
var burger = document.querySelector('.hamburger');
var menu = document.getElementById('overlay-menu');

burger.addEventListener('click', function() {
  if ( burger.classList.contains('is-active') ) {
    burger.classList.remove('is-active');
    menu.style.display = 'none';
  } else {
    burger.classList.add('is-active');
    menu.style.display = 'block';
  }
});