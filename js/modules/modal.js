function openModal(modalSelector, modalTimer) {
const modal = document.querySelector(modalSelector);

  modal.classList.add("show", "fade");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
  window.removeEventListener("scroll", () => showModalByScroll());

  if(modalTimer) {
    clearInterval(modalTimer);
  }
}

function closeModal(modalSelector) {
const modal = document.querySelector(modalSelector);

  modal.classList.add("hide");
  modal.classList.remove("show", "fade");
  document.body.style.overflow = "";
}

function modal(trigerSelector, modalSelector, modalTimer) {
  // Modal

  const modalTriger = document.querySelectorAll(trigerSelector),
    modal = document.querySelector(modalSelector);

  modalTriger.forEach((item) => {
    item.addEventListener("click", () => openModal(modalSelector, modalTimer));
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal(modalSelector, modalTimer);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export {openModal, closeModal}; 