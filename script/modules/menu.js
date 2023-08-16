export const menuControl = () => {
  const button = document.querySelector('.header__menu-button');
  const menu = document.querySelector('.header__menu');
  const list = document.querySelector('.header__list');

  const closeMenu = () => {
    menu.classList.add('header__menu_closing');
    setTimeout(() => {
      menu.classList.remove('header__menu_closing');
    }, 600);
    menu.classList.remove('header__menu_active');
  };

  button.addEventListener('click', () => {
    if (menu.classList.contains('header__menu_active')) {
      menu.classList.remove('header__menu_active');
      closeMenu();
    } else {
      menu.classList.add('header__menu_active');
    }
  });

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
};
