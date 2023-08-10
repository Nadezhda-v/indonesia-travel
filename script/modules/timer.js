export const startTimer = (timerBlock, deadline) => {
  const timerId = timerBlock.getAttribute('data-timer-id');
  const associatedTimer = document.querySelector(
    `[data-associated-timer="${timerId}"]
  `);

  const timer = (deadline) => {
    const countDays = timerBlock.querySelector('.timer__count_days');
    const unitsDays = timerBlock.querySelector('.timer__units_days');
    const countHours = timerBlock.querySelector('.timer__count_hours');
    const unitsHours = timerBlock.querySelector('.timer__units_hours');
    const countMinutes = timerBlock.querySelector('.timer__count_minutes');
    const unitsMinutes = timerBlock.querySelector('.timer__units_minutes');

    const getTimeRemaining = () => {
      const dateStop = new Date(deadline).getTime();
      const dateNow = Date.now();
      const temeRemaining = dateStop - dateNow;

      const minutes = (Math.floor(temeRemaining / 1000 / 60 % 60))
        .toString()
        .padStart(2, '0');
      const hours = (Math.floor(temeRemaining / 1000 / 60 / 60 % 24))
        .toString()
        .padStart(2, '0');
      const days = Math.floor(temeRemaining / 1000 / 60 / 60 / 24);

      return {
        temeRemaining,
        minutes,
        hours,
        days,
      };
    };

    const formatWord = (number, words) => {
      let wordIndex;

      if (number % 100 > 4 && number % 100 < 20) {
        wordIndex = 2;
      } else {
        const lastDigit = number % 10;
        if (lastDigit === 1) {
          wordIndex = 0;
        } else if (lastDigit > 1 && lastDigit < 5) {
          wordIndex = 1;
        } else {
          wordIndex = 2;
        }
      }

      return words[wordIndex];
    };

    const formatTimeWords = (minutes, hours, days) => {
      const dayVariations = ['день', 'дня', 'дней'];
      const hourVariations = ['час', 'часа', 'часов'];
      const minuteVariations = ['минута', 'минуты', 'минут'];

      const formattedDays = formatWord(days, dayVariations);
      const formattedHours = formatWord(hours, hourVariations);
      const formattedMinutes = formatWord(minutes, minuteVariations);

      return {formattedDays, formattedHours, formattedMinutes};
    };

    const start = () => {
      const timer = getTimeRemaining();

      countDays.textContent = timer.days;
      countHours.textContent = timer.hours;
      countMinutes.textContent = timer.minutes;

      const formattedWords = formatTimeWords(
        timer.minutes, timer.hours, timer.days,
      );

      unitsDays.textContent = formattedWords.formattedDays;
      unitsHours.textContent = formattedWords.formattedHours;
      unitsMinutes.textContent = formattedWords.formattedMinutes;

      const intervalId = setTimeout(start, 60000);

      if (timer.temeRemaining <= 0) {
        clearTimeout(intervalId);
        timerBlock.style.display = 'none';
        associatedTimer ? associatedTimer.style.display = 'none' : null;
      }
    };

    start();
  };

  timer(deadline);
};
