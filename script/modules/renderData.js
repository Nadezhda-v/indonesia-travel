import {
  delOption,
  formatDate,
  formatCountPeople,
} from './control.js';

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

    return price;
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
      const price = renderPrice(reservationDate.value, reservationPeople.value);
      const date = formatDate(reservationDate.value);
      const countPeople = formatCountPeople(reservationPeople.value);

      reservationInfo.textContent = `
        ${date}, ${countPeople}
      `;
      reservationPrice.textContent = `${price} ₽`;
      reservationInfo.style.opacity = '1';
    }
  });
};

