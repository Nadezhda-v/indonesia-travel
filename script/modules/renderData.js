import {
  delOption,
  formatDate,
  formatCountPeople,
  disableFormElements,
} from './control.js';

import {
  showConfirmModal,
  showSuccessModal,
  showErrorModal,
} from './modal.js';

import {fetchRequest} from './request.js';
import {
  controlInputValue,
} from './formValidation.js';

export const renderData = (data) => {
  const tourForm = document.querySelector('.tour__form');
  const tourDate = tourForm.querySelector('#tour__date');
  const tourOptionDate = tourDate.querySelectorAll('.tour__option');

  const tourPeople = tourForm.querySelector('#tour__people');
  const tourOptionPeople = tourPeople.querySelectorAll('.tour__option');

  const reservationForm = document.querySelector('.reservation__form');
  const reservationDate = reservationForm.querySelector('#reservation__date');
  const reservationOptionDate =
    reservationDate.querySelectorAll('.tour__option');

  const reservationPeople =
    reservationForm.querySelector('#reservation__people');
  const reservationPhone =
    reservationForm.querySelector('#reservation__phone');
  const reservationOptionPeople =
    reservationPeople.querySelectorAll('.tour__option');

  const reservationInfo = reservationForm.querySelector('.reservation__data');
  const reservationPrice = reservationForm.querySelector('.reservation__price');

  reservationInfo.style.opacity = '0';
  reservationPrice.textContent = `0 ₽`;

  delOption(reservationOptionDate);
  delOption(tourOptionDate);
  delOption(reservationOptionPeople);
  delOption(tourOptionPeople);

  // Рендер дат на странице
  const renderDate = (selectElement, classes) => {
    data.forEach(item => {
      const optionElement = document.createElement('option');
      optionElement.value = item.date;
      optionElement.textContent = item.date;
      optionElement.classList.add(...classes);

      selectElement.append(optionElement);
    });
  };

  renderDate(reservationDate, ['tour__option', 'reservation__option']);
  renderDate(tourDate, ['tour__option']);

  // Рендер кол-ва человек на странице
  const renderCountPeople = (selectedValue, selectElement, classes) => {
    const optionElements = selectElement.querySelectorAll(`.${classes[0]}`);
    delOption(optionElements);
    const item = data.find(item => item.date === selectedValue);

    if (item) {
      for (let i = item['min-people']; i <= item['max-people']; i++) {
        const optionCount = document.createElement('option');
        optionCount.classList.add(...classes);
        optionCount.textContent = i;

        selectElement.append(optionCount);
      }
    }
  };

  const renderPrice = (date, count) => {
    const item = data.find(item => item.date === date);
    const price = item.price * count;

    const formattedPrice = price.toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return formattedPrice;
  };

  const formatData = (reservationDate, countPeople) => {
    const price = renderPrice(reservationDate, countPeople);
    const date = formatDate(reservationDate);
    const people = formatCountPeople(countPeople);

    return {price, date, people};
  };

  tourDate.addEventListener('change', async () => {
    const selectedValue = tourDate.value;
    renderCountPeople(
      selectedValue,
      tourPeople,
      ['tour__option'],
    );
  });

  reservationDate.addEventListener('change', async () => {
    const selectedValue = reservationDate.value;
    renderCountPeople(
      selectedValue,
      reservationPeople,
      ['tour__option', 'reservation__option'],
    );
  });

  reservationForm.addEventListener('change', () => {
    reservationInfo.style.opacity = '0';
    reservationPrice.textContent = `0 ₽`;

    if (reservationDate.value && reservationPeople.value) {
      const data = formatData(reservationDate.value, reservationPeople.value);

      reservationInfo.textContent = `
        ${data.date}, ${data.people}
      `;
      reservationPrice.textContent = `${data.price}`;
      reservationInfo.style.opacity = '1';
    }
  });

  controlInputValue();

  const validateReservationForm = () => {
    const validateReservationForm = new JustValidate('.reservation__form');
    validateReservationForm
      .addField('#reservation__date', [
        {
          rule: 'required',
          errorMessage: 'Выберите дату',
        },
      ])
      .addField('#reservation__people', [
        {
          rule: 'required',
          errorMessage: 'Укажите количество человек',
        },
      ])
      .addField('#reservation__name', [
        {
          rule: 'required',
          errorMessage: 'Введите ФИО',
        },
        {
          rule: 'customRegexp',
          value: /^([а-яА-ЯёЁ]{2,}\s){2,}[а-яА-ЯёЁ]{2,}$/,
          errorMessage: 'ФИО некорректное',
        },
      ])
      .addField('#reservation__phone', [
        {
          rule: 'required',
          errorMessage: 'Введите телефон',
        },
        {
          validator() {
            const phone = reservationPhone.inputmask.unmaskedvalue();
            return !!(phone.length === 10);
          },
          errorMessage: 'Телефон некорректный',
        },
      ])
      .onSuccess(async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};

        for (const [name, value] of formData) {
          data[name] = value;
          if (name === 'phone') {
            const value = reservationPhone.inputmask.unmaskedvalue();
            data[name] = value;
          }
        }

        const formattedData = formatData(data.date, data.people);
        await showConfirmModal(formattedData);
        const confirmButton = document
          .querySelector('.modal__button_confirm');

        confirmButton.addEventListener('click', async () => {
          await fetchRequest('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: data,
            callback(err, data) {
              if (err) {
                console.warn(err, data);
                showErrorModal();
              } else {
                showSuccessModal();
                reservationForm.reset();
                reservationInfo.style.opacity = '0';
                reservationPrice.textContent = `0 ₽`;
                disableFormElements(reservationForm);
              }
            },
            headers: {
              'Content-Type': 'application/json',
            },
          });
        });
      });
  };

  validateReservationForm();
};
