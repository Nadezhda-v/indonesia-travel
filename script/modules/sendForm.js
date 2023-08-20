export const sendForm = () => {
  const footerForm = document.querySelector('.footer__form');
  const footerText = document.querySelector('.footer__text');
  const footerTitle = document.querySelector('.footer__form-title');
  const footerInput = document.querySelector('.footer__input-wrap');

  const reservationForm = document.querySelector('.reservation__form');

  const successOverlay = document.querySelector('.success__overlay');
  const errorOverlay = document.querySelector('.error__overlay');

  const fetchRequest = async (url, {
    method = 'GET',
    callback,
    body,
    headers,
  }) => {
    try {
      const options = {
        method,
      };

      if (body) options.body = JSON.stringify(body);
      if (headers) options.headers = headers;

      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        if (callback) callback(null, data);

        return;
      }

      throw new Error(response.status);
    } catch (err) {
      if (callback) callback(err);
    }
  };

  const url = 'https://jsonplaceholder.typicode.com/posts';

  footerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const mail = footerForm.mail.value;

    fetchRequest(url, {
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

  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};

    for (const [name, value] of formData) {
      data[name] = value;
    }

    fetchRequest(url, {
      method: 'POST',
      body: data,
      callback(err, data) {
        if (err) {
          console.warn(err, data);
          errorOverlay.classList.remove('hidden');
        } else {
          successOverlay.classList.remove('hidden');
        }
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
};
