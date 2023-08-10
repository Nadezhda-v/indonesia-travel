import {startTimer} from './timer.js';

const createTimerBlock = (timer) => {
  const timerTitle = document.createElement('p');
  timerTitle.classList.add('timer__title');
  timerTitle.textContent = 'До конца акции осталось:';

  const daysItem = document.createElement('p');
  daysItem.classList.add('timer__item', 'timer__item_days');

  const countDays = document.createElement('span');
  countDays.classList.add('timer__count', 'timer__count_days');
  countDays.textContent = '2';

  const unitsDays = document.createElement('span');
  unitsDays.classList.add('timer__units', 'timer__units_days');
  unitsDays.textContent = 'дня';

  const hoursItem = document.createElement('p');
  hoursItem.classList.add('timer__item', 'timer__item_hours');

  const countHours = document.createElement('span');
  countHours.classList.add('timer__count', 'timer__count_hours');
  countHours.textContent = '05';

  const unitsHours = document.createElement('span');
  unitsHours.classList.add('timer__units', 'timer__units_hours');
  unitsHours.textContent = 'часов';

  const minutesItem = document.createElement('p');
  minutesItem.classList.add('timer__item', 'timer__item_minutes');

  const countMinutes = document.createElement('span');
  countMinutes.classList.add('timer__count', 'timer__count_minutes');
  countMinutes.textContent = '12';

  const unitsMinutes = document.createElement('span');
  unitsMinutes.classList.add('timer__units', 'timer__units_minutes');
  unitsMinutes.textContent = 'минут';

  daysItem.append(countDays, unitsDays);
  hoursItem.append(countHours, unitsHours);
  minutesItem.append(countMinutes, unitsMinutes);
  timer.append(timerTitle, daysItem, hoursItem, minutesItem);

  return timer;
};

const timerPlugin = (deadlines) => {
  const timers = document.querySelectorAll('[data-timer-deadline]');

  [...timers].forEach((timer, index) => {
    const timerBlock = createTimerBlock(timer);
    const deadline = deadlines[index];

    startTimer(timerBlock, deadline);
  });
};

export {timerPlugin};
