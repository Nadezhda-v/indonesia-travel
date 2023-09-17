import {fetchRequest} from './request.js';

const reservationName = document.querySelector('#reservation__name');
const reservationPhone = document.querySelector('#reservation__phone');

const footerForm = document.querySelector('.footer__form');
const footerText = footerForm.querySelector('.footer__text');
const footerTitle = footerForm.querySelector('.footer__form-title');
const footerInputWrap = footerForm.querySelector('.footer__input-wrap');

const addMask = () => {
  const maskPhone = new Inputmask('+7 (999) 999-99-99');
  maskPhone.mask(reservationPhone);
};

const controlInputValue = () => {
  reservationName.addEventListener('input', () => {
    reservationName.value = reservationName.value.replace(/[^а-яА-ЯёЁ\s]/g, '');
  });

  addMask();
};

const validateFooterForm = () => {
  const validateFooterForm = new JustValidate('.footer__form');

  validateFooterForm
    .addField('.footer__input', [
      {
        rule: 'required',
        errorMessage: 'Введите email',
      },
      {
        rule: 'email',
        errorMessage: 'Некорректный email',
      },
    ])
    .onSuccess(({target}) => {
      const mail = target.mail.value;

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
            footerInputWrap.style.opacity = '0';
            footerInputWrap.style.visibility = 'hidden';
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
  controlInputValue,
  validateFooterForm,
};
