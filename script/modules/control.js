const button = document.querySelector('.header__menu-button');
const menu = document.querySelector('.header__menu');
const list = document.querySelector('.header__list');

// Закрытие меню
const closeMenu = () => {
  menu.classList.add('header__menu_closing');
  setTimeout(() => {
    menu.classList.remove('header__menu_closing');
  }, 600);
  menu.classList.remove('header__menu_active');
};

/* Функция принимает строку диапазона дат в формате "дд.мм - дд.мм"
  и возвращает строку с форматированным представлением диапазона дат.
  Например, "11 января - 5 февраля"*/
const formatDate = (date) => {
  const [start, end] = date.split(' - ');

  const [startDay, startMonth] = start.split('.');
  const [endDay, endMonth] = end.split('.');

  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
  ];

  const formattedDate = `
    ${+startDay} ${months[startMonth - 1]} -
    ${+endDay} ${months[endMonth - 1]}
  `;

  return formattedDate;
};

// Выбор склонения в зависимости от указанного числа людей
const formatCountPeople = (count) => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return `${count} человек`;
  } else if (count % 10 >= 2 && count % 10 <= 4 &&
    (count % 100 < 10 || count % 100 >= 20)) {
    return `${count} человека`;
  } else {
    return `${count} человек`;
  }
};

// Удаление всех <option>, кроме первого
const delOption = (optionElements) => {
  for (let i = 1; i < optionElements.length; i++) {
    optionElements[i].remove();
  }
};

const handleEvent = () => {
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

export {
  handleEvent,
  delOption,
  formatDate,
  formatCountPeople,
};
