const button = document.querySelector('.header__menu-button');
const menu = document.querySelector('.header__menu');
const list = document.querySelector('.header__list');

button.addEventListener('click', () => {
  menu.classList.toggle('header__menu_active');
});

const closeMenu = () => {
  menu.classList.remove('header__menu_active');
};

document.addEventListener('click', ({target}) => {
  if (!button.contains(target) && !menu.contains(target)) {
    closeMenu();
  }
});

list.addEventListener('click', ({target}) => {
  if (target.matches('.header__link')) {
    closeMenu();
  }
});
