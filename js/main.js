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

  const deadline = "2022-9-29";

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

  const modalTimer = setTimeout(openModal, 30000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  // Используем классы для карточек.

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 35;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price *= this.transfer;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length > 0) {
        this.classes.forEach(className => {
          element.classList.add(className);
        });
      } else {
        element.classList.add('menu__item');
      }
    
      element.innerHTML = `<img src="${this.src}" alt="${this.alt}" />
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">
        ${this.descr}
      </div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>`;

      this.parent.append(element);
    }
  }

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    11,
    ".menu__field .container",
    'menu__item'
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню “Премиум”",
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    15,
    ".menu__field .container",
    'menu__item'
  ).render();

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    10,
    ".menu__field .container",
    'menu__item'
  ).render();

  const cannaMenu = new MenuCard(
    "img/tabs/canna.jpg",
    "canna",
    'Меню "Канна"',
    "Весело и вкусно",
    25,
    ".menu__field .container"
  );
  cannaMenu.render();

  //Forms

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'Загрузка',
    success: 'Спасибо. Скоро мы с вами свяжемся.',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(i => {
    postData(i);
  });

  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;  
      form.append(statusMessage);

      const req = new XMLHttpRequest();
      req.open('POST', 'server.php');
      req.setRequestHeader('Content-type', 'application/json');

      const formData = new FormData(form);

      const obj = {};
      formData.forEach((value, key) => {
        obj[key] = value;
      });
      
      req.send(JSON.stringify(obj));

      req.addEventListener('load', () => {
        if (req.status === 200) {
          console.log(req.response);
          statusMessage.textContent = message.success;  
          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 3000);
        } else {
          statusMessage.textContent = message.failure;  
        }
      });


    });
  }

 

  
  
  
  
  



 
  
  
});