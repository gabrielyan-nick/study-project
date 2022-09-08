function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
  // Slider

  const slides = document.querySelectorAll(slide),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    current = document.querySelector(currentCounter),
    total = document.querySelector(totalCounter),
    sliderField = document.querySelector(field),
    sliderWrapper = document.querySelector(wrapper),
    width = window.getComputedStyle(sliderWrapper).width,
    slider = document.querySelector(container);

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
}

export default slider;
