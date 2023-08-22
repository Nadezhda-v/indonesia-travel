import {fetchRequest} from './request.js';

const button = document.querySelector('.header__menu-button');
const menu = document.querySelector('.header__menu');
const list = document.querySelector('.header__list');

const footerForm = document.querySelector('.footer__form');
const footerText = document.querySelector('.footer__text');
const footerTitle = document.querySelector('.footer__form-title');
const footerInput = document.querySelector('.footer__input-wrap');

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

// Блокировка всех элементов в форме
const disableFormElements = (form) => {
  const formElements = form.querySelectorAll('input, textarea, select, button');
  formElements.forEach(element => {
    element.setAttribute('disabled', 'disabled');
  });
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

  document.addEventListener('click', (e) => {
    const modalButton = e.target.closest('.modal__button');

    if (modalButton) {
      const overlay = modalButton.closest('.overlay');
      overlay.remove();
    }
  });

  footerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const mail = footerForm.mail.value;

    fetchRequest('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: {
        body: mail,
      },
      callback(err, data) {
        const heightBlock = footerForm.clientHeight;
        if (err) {
          console.warn(err, data);
          footerTitle.style.opacity = '0';
          footerTitle.textContent = `
            Не удалось отправить заявку.
            Пожалуйста, повторите отправку еще раз
          `;
          footerText.textContent = '';
        } else {
          footerForm.style.opacity = '0';
          footerTitle.textContent = 'Ваша заявка успешно отправлена';
          footerText.textContent = `
            Наши менеджеры свяжутся с вами в течении 3-х рабочих дней
          `;
          footerInput.style.opacity = '0';
          footerInput.style.visibility = 'hidden';
        }

        footerForm.style.height = heightBlock + 'px';

        setTimeout(() => {
          footerForm.style.opacity = '1';
          footerTitle.style.opacity = '1';
        }, 300);
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
};

export {
  handleEvent,
  delOption,
  formatDate,
  formatCountPeople,
  disableFormElements,
};
