const reservationName = document.querySelector('#reservation__name');
const reservationPhone = document.querySelector('#reservation__phone');

const namePattern = /^([а-яА-ЯёЁ]{2,}\s){2,}[а-яА-ЯёЁ]{2,}$/;
const phonePattern = /^(\+?7|8)\d{10}$/;

const controlInputValue = () => {
  reservationName.addEventListener('input', () => {
    reservationName.value = reservationName.value.replace(/[^а-яА-ЯёЁ\s]/g, '');
  });

  reservationPhone.addEventListener('input', () => {
    let inputPhone = reservationPhone.value.replace(/[^+\d]/g, '');

    // Разрешить ввод только одного символа "+"
    if (inputPhone.includes('+')) {
      inputPhone = inputPhone.replace(/\+/g, '');
      inputPhone = '+' + inputPhone;
    }

    if (inputPhone.includes('+')) {
      // Если есть символ "+", ограничение длины строки до 12 символов
      reservationPhone.value = inputPhone.length > 12 ?
        inputPhone.slice(0, 12) : inputPhone;
    } else {
      // Если нет символа "+", ограничение длины строки до 11 символов
      reservationPhone.value = inputPhone.length > 11 ?
        inputPhone.slice(0, 11) : inputPhone;
    }
  });
};

const isValidValueForm = () => {
  const inputName = reservationName.value;
  const inputPhone = reservationPhone.value;

  const isValidName = namePattern.test(inputName);
  const isValidPhone = phonePattern.test(inputPhone);

  return {isValidName, isValidPhone};
};

export {
  isValidValueForm,
  controlInputValue,
};
