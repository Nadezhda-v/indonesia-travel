import {
  addStyle,
  removeStyle,
} from './loadStyle.js';

const showConfirmModal = async ({price, date, people}) => {
  await addStyle('css/modal-сonfirm.css');
  const confirmOverlay = document.createElement('div');
  confirmOverlay.classList.add('overlay', 'overlay_confirm');

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const title = document.createElement('h2');
  title.classList.add('modal__title');
  title.textContent = 'Подтверждение заявки';

  const text1 = document.createElement('p');
  text1.classList.add('modal__text');
  text1.textContent = `Бронирование путешествия в Индонезию на ${people}`;

  const text2 = document.createElement('p');
  text2.classList.add('modal__text');
  text2.textContent = `В даты: ${date}`;

  const text3 = document.createElement('p');
  text3.classList.add('modal__text');
  text3.textContent = `Стоимость тура ${price}`;

  const buttonsWrap = document.createElement('div');
  buttonsWrap.classList.add('modal__buttons');

  const confirmButton = document.createElement('button');
  confirmButton.classList.add('modal__button', 'modal__button_confirm');
  confirmButton.textContent = 'Подтверждаю';

  const editButton = document.createElement('button');
  editButton.classList.add('modal__button', 'modal__button_edit');
  editButton.textContent = 'Изменить данные';

  buttonsWrap.append(confirmButton, editButton);
  modal.append(title, text1, text2, text3, buttonsWrap);
  confirmOverlay.append(modal);

  document.body.append(confirmOverlay);
};

const showSuccessModal = async () => {
  await removeStyle('css/modal-сonfirm.css');
  await addStyle('css/modal.css');
  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'success__overlay');

  const modal = document.createElement('div');
  modal.classList.add('modal', 'success__modal');
  modal.id = 'successModal';

  const content = document.createElement('div');
  content.classList.add('modal__content');

  const title = document.createElement('h2');
  title.classList.add('modal__title');
  title.textContent = 'Ваша заявка успешно отправлена';

  const text = document.createElement('p');
  text.classList.add('modal__text');
  text.textContent = `
    Наши менеджеры свяжутся с вами в течение 3-х рабочих дней
  `;

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.classList.add('button', 'modal__button', 'modal__button_success');
  closeButton.setAttribute('aria-label', 'Кнопка закрытия окна');

  const closeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  closeIcon.setAttribute('width', '62');
  closeIcon.setAttribute('height', '62');
  closeIcon.setAttribute('viewBox', '0 0 62 62');
  closeIcon.setAttribute('fill', 'none');

  const pathData = (
    'M23.2618 41.8332L12.4285 30.9999L8.81738 34.611L23.2618 49.0554' +
    'L54.2142 18.1031L50.6031 14.4919L23.2618 41.8332Z'
  );

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathData);
  path.setAttribute('fill', 'white');

  closeIcon.append(path);
  closeButton.append(closeIcon);
  content.append(title, text, closeButton);
  modal.append(content);
  overlay.append(modal);

  document.body.append(overlay);
};

const showErrorModal = async () => {
  await removeStyle('css/modal-сonfirm.css');
  await addStyle('css/modal.css');
  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'error__overlay');

  const modal = document.createElement('div');
  modal.classList.add('modal', 'error__modal');
  modal.id = 'errorModal';

  const content = document.createElement('div');
  content.classList.add('modal__content');

  const title = document.createElement('h2');
  title.classList.add('modal__title');
  title.textContent = 'Упс... Что-то пошло не так';

  const text = document.createElement('p');
  text.classList.add('modal__text');
  text.textContent = `
    Не удалось отправить заявку. Пожалуйста, повторите отправку еще раз
  `;

  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add(
    'button',
    'modal__button',
    'modal__button_error',
    'reservation__button',
  );
  button.textContent = 'Забронировать';

  content.append(title, text, button);
  modal.append(content);
  overlay.append(modal);

  document.body.append(overlay);

  button.addEventListener('click', () => {
    removeStyle('css/modal.css');
  });
};

export {
  showConfirmModal,
  showSuccessModal,
  showErrorModal,
};
