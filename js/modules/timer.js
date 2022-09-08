function timer(timerSelector, deadline) {
  //timer

  function getTimeRemaining(endtime) {
    // определяем оставшееся время, результат в обьект
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.now();

    if (t <= 0) {
      (days = 0), (hours = 0), (minutes = 0), (seconds = 0);
    } else {
      (days = Math.floor(t / (1000 * 60 * 60 * 24))),
        (hours = Math.floor((t / (1000 * 60 * 60)) % 24)),
        (minutes = Math.floor((t / (1000 * 60)) % 60)),
        (seconds = Math.floor((t / 1000) % 60));
    }

    return {
      t,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function getZero(num) {
    // добавляем 0 к цифре
    if (num < 10 && num >= 0) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      min = timer.querySelector("#minutes"),
      sec = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000); // обновляем таймер каждую сек

    updateClock();

    function updateClock() {
      // записываем результат в верстку
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days); // добавляем 0 к дню
      hours.innerHTML = getZero(t.hours);
      min.innerHTML = getZero(t.minutes);
      sec.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval); // выкл обновление, если время истекло
      }
    }
  }

  setClock(timerSelector, deadline);
}

export default timer;
