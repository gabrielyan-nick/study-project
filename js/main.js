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
    modal = document.querySelector(".modal");

  function openModal() {
    modal.classList.add("show", "fade");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimer);
    window.removeEventListener("scroll", showModalByScroll);
  }

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show", "fade");
    document.body.style.overflow = "";
  }

  modalTriger.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
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
        this.classes.forEach((className) => {
          element.classList.add(className);
        });
      } else {
        element.classList.add("menu__item");
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

  // const getResourse = async url => {    // Функция для получения данных для карточек товара.
  //   const res = await fetch(url);

  //   if (!res.ok) {
  //     throw new Error(`Could not fetch ${url}, status ${res.status}`);
  //   }
  //   return await res.json();
  // };

  // getResourse('http://localhost:3000/menu')  // Формируем верстку.
  // .then(data => {
  //   data.forEach(({img, altimg, title, descr, price}) => {
  //     new MenuCard(img, altimg, title, descr, price, ".menu__field .container").render();
  //   });
  // });

  axios
    .get("http://localhost:3000/menu") // Получение данных для карточек товара с помощью axios.
    .then((data) => {
      data.data.forEach(({ img, altimg, title, descr, price }) => {
        new MenuCard(
          img,
          altimg,
          title,
          descr,
          price,
          ".menu__field .container"
        ).render();
      });
    });

  // const cannaMenu = new MenuCard(
  //   "img/tabs/canna.jpg",
  //   "canna",
  //   'Меню "Канна"',
  //   "Весело и вкусно",
  //   25,
  //   ".menu__field .container"
  // );
  // cannaMenu.render();

  //Forms

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо. В ближайшее время мы с вами свяжемся",
    failure: "Ой, что-то пошло не так...",
  };

  forms.forEach((i) => {
    bindpostData(i);
  });

  // const postData = async (url, data) => {    // Функция для отправки данных.
  //   const res = await fetch(url, {
  //     method: 'POST',
  //     body: data,
  //     headers: {"Content-type": "application/json"}
  //   });

  //   return await res.json();
  // };

  function bindpostData(form) {
    // Функция для отправки и обработки данных.
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.classList.add("loading-img");
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      // const json = JSON.stringify(Object.fromEntries(formData.entries()));
      //            в json            в обьект          в массив массивов

      axios
        .post(
          "http://localhost:3000/requests",
          Object.fromEntries(formData.entries())
        ) // Отправка данных с помощью axios.
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
        })
        .catch((data) => {
          console.log(data);
          showThanksModal(message.failure);
        })
        .finally(() => {
          statusMessage.remove();
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    // Функция для показа резузьтата пользователю после отправки формы.
    const modalDialog = document.querySelector(".modal__dialog");

    modalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
    <div class="modal__content">
            <div data-close="" class="modal__close">×</div>
            <div class="modal__title">${message}
            </div>
        </div>
    `;

    modal.append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      modalDialog.classList.remove("hide");
      modalDialog.classList.add("show");
      closeModal();
    }, 3000);
  }

  // Slider

  const slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    sliderField = document.querySelector(".offer__slider-inner"),
    sliderWrapper = document.querySelector(".offer__slider-wrapper"),
    width = window.getComputedStyle(sliderWrapper).width,
    slider = document.querySelector(".offer__slider");

  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    // Инициализация счетчика.
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  sliderField.style.width = 100 * slides.length + "%";
  sliderField.style.display = "flex";
  sliderField.style.transition = "all 0.5s";
  sliderWrapper.style.overflow = "hidden";
  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ul"), // Обертка для точек.
    dots = [];

  indicators.classList.add("carousel-indicators");
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    // Создаем точки.
    const dot = document.createElement("li");

    dot.classList.add("dot");
    dot.setAttribute("data-slide-to", i + 1);
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function addZero() {
    // Добавляет ноль в счетчике.
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  function dotActive() {
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  }

  function getNum(str) {
    return +str.replace(/\D/g, "");
  }

  next.addEventListener("click", () => {
    if (offset == getNum(width) * (slides.length - 1)) {
      // Круговая прокрутка.
      offset = 0;
    } else {
      offset += getNum(width);
    }

    sliderField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      // Круговая прокрутка счетчика.
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    addZero();
    dotActive();
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = getNum(width) * (slides.length - 1);
    } else {
      offset -= getNum(width);
    }

    sliderField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    addZero();
    dotActive();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = getNum(width) * (slideTo - 1);

      sliderField.style.transform = `translateX(-${offset}px)`;

      addZero();
      dotActive();
    });
  });

// Calculator

const result = document.querySelector('.calculating__result span');

let sex, height, weight, age, ratio;

if (localStorage.getItem('ratio')) {
  ratio = localStorage.getItem('ratio');
} else {
 ratio = 1.375;
 localStorage.setItem('ratio', '1.375');
}
if (localStorage.getItem('sex')) {
 sex = localStorage.getItem('sex');
} else {
 sex = 'female';
 localStorage.setItem('sex', 'female');
}

function initSettings(selector, activeClass) {    // Берет данные из localStorage и инициализирует калькулятор. 
  const elements = document.querySelectorAll(selector);

  elements.forEach(elem => {
    elem.classList.remove(activeClass);

    if (elem.getAttribute('id') === localStorage.getItem('sex')) {
      elem.classList.add(activeClass);
    }
    if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
      elem.classList.add(activeClass);
    }
  });
}

initSettings('#gender div', 'calculating__choose-item_active');
initSettings('.calculating__choose_big div', 'calculating__choose-item_active');

function calcTotal() {                          // Считает результат по формуле.
  if (!sex || !height || !weight || !age || !ratio) {
    result.textContent = '____';
    return;
  }

  if (sex === 'female') {
    result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
  } else {
    result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
  }
}

calcTotal();

function getStaticInfo(selector, activeClass) {        // Собирает инфу.
  const elements = document.querySelectorAll(selector);

  elements.forEach(elem => {
    elem.addEventListener('click', (e) => {
      if (e.target.getAttribute('data-ratio')) {
        ratio = +e.target.getAttribute('data-ratio');
        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
      } else {
        sex = e.target.getAttribute('id');
        localStorage.setItem('sex', e.target.getAttribute('id'));
      }

      elements.forEach(item => {
        item.classList.remove(activeClass);
      });
  
      e.target.classList.add(activeClass);
  
      calcTotal();
    });
  });
}

getStaticInfo('#gender div', 'calculating__choose-item_active');
getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

function getInputInfo(selector) {                         // Собирает инфу из инпутов.
  const input = document.querySelector(selector);

  input.addEventListener('input', () => {

    if (input.value.match(/\D/g)) {
      input.style.border = '1px solid red';
    } else {
      input.style.border = 'none';
    }

    switch(input.getAttribute('id')) {
    case 'height':
      height = +input.value;
      break;
    case 'weight':
      weight = +input.value;
      break;
    case 'age':
      age = +input.value;
      break;
    }

    calcTotal();
  });
}

getInputInfo('#weight');
getInputInfo('#age');
getInputInfo('#height');








});
