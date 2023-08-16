export const airplaneControl = () => {
  if (window.innerWidth < 758) {
    return;
  }

  const docEl = document.documentElement;
  const airplane = document.createElement('div');
  let isScrollingDown = true;

  airplane.style.cssText = `
    position: fixed;
    width: 50px;
    height: 50px;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background: url('img/airplane.svg') center/contain;
    transition: transform 0.3s ease-in-out;
  `;

  document.body.append(airplane);

  const calcPositionAirplane = () => {
    // Максимальное значение, на которое можно прокрутить страницу
    const maxScroll = docEl.scrollHeight - docEl.clientHeight;

    // Процент прокрутки страницы
    const persentScroll = (window.scrollY * 100) / maxScroll;

    const height =
      (docEl.clientHeight - airplane.clientHeight) * (persentScroll / 100);

    if (persentScroll <= 0) {
      isScrollingDown = true;
    }

    if (persentScroll >= 99) {
      isScrollingDown = false;
    }

    const rotation = isScrollingDown ? 'rotate(0deg)' : 'rotate(180deg)';

    airplane.style.transform = `translateY(-${height}px) ${rotation}`;
  };

  window.addEventListener('scroll', () => {
    requestAnimationFrame(calcPositionAirplane);
  });

  calcPositionAirplane();
};
