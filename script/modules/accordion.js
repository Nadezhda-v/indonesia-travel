export const accordionControl = () => {
  const items = document.querySelectorAll('.travel__item');
  const buttons = document.querySelectorAll('.travel__item-title');
  const textWrapper = document.querySelectorAll('.travel__item-text-wrapper');

  let heightWrapper = 0;

  textWrapper.forEach(text => {
    if (heightWrapper < text.scrollHeight) {
      heightWrapper = text.scrollHeight;
    }
  });

  textWrapper[0].style.height = `${heightWrapper}px`;

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      items.forEach((item, i) => {
        if (index === i) {
          console.log(textWrapper[i]);
          const isActive = items[i].classList.contains('travel__item_active');
          textWrapper[i].style.height = isActive ?
              '0' : `${heightWrapper}px`;
          item.classList.toggle('travel__item_active');
        } else {
          item.classList.remove('travel__item_active');
          textWrapper[i].style.height = '0';
        }
      });
    });
  });
};
