"use strict";

window.addEventListener("DOMContentLoaded", () => {
  //tabs

  const tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items"),
    tabsBtn = document.querySelectorAll(".tabheader__item");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.remove("show", "fade");
      item.classList.add("hide");
    });

    tabsBtn.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.remove("hide");
    tabsContent[i].classList.add("show", "fade");
    tabsBtn[i].classList.add("tabheader__item_active");
  }

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabsBtn.forEach((item, i) => {
        if (item == target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  hideTabContent();
  showTabContent();

  //timer

  const deadline = "2022-08-29";

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

  setClock(".timer", deadline);

  // Modal

  const modalTriger = document.querySelectorAll("[data-modal]"),
    modalClose = document.querySelector("[data-close]"),
    modalWindow = document.querySelector(".modal");

  function openModal() {
    modalWindow.classList.add("show", "fade");
    modalWindow.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimer);
  }

  function closeModal() {
    modalWindow.classList.add("hide");
    modalWindow.classList.remove("show", "fade");
    document.body.style.overflow = "";
  }

  modalTriger.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  modalClose.addEventListener("click", closeModal);

  modalWindow.addEventListener("click", (e) => {
    if (e.target === modalWindow) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modalWindow.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimer = setTimeout(openModal, 5000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);








});
