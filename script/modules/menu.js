const button = document.querySelector('.header__menu-button');
const menu = document.querySelector('.header__menu');

button.addEventListener('click', () => {
  menu.classList.toggle('header__menu_active');
});
