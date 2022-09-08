import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function forms(modalTimer, selector) {
  //Forms

  const forms = document.querySelectorAll(selector);

  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо. В ближайшее время мы с вами свяжемся",
    failure: "Ой, что-то пошло не так...",
  };

  forms.forEach((i) => {
    bindpostData(i);
  });

  function bindpostData(form) {
    // Функция для отправки и обработки данных.
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.classList.add("loading-img");
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      //            в json            в обьект          в массив массивов

      postData("http://localhost:3000/requests", json)
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

      // axios                            Отправка данных с помощью axios.
      //   .post(
      //     "http://localhost:3000/requests",
      //     Object.fromEntries(formData.entries())
      //   ) // Отправка данных с помощью axios.
      //   .then((data) => {
      //     console.log(data);
      //     showThanksModal(message.success);
      //   })
      //   .catch((data) => {
      //     console.log(data);
      //     showThanksModal(message.failure);
      //   })
      //   .finally(() => {
      //     statusMessage.remove();
      //     form.reset();
      //   });
    });
  }

  function showThanksModal(message) {
    // Функция для показа резузьтата пользователю после отправки формы.
    const modalDialog = document.querySelector(".modal__dialog");

    modalDialog.classList.add("hide");
    openModal(".modal", modalTimer);

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
    <div class="modal__content">
            <div data-close="" class="modal__close">×</div>
            <div class="modal__title">${message}
            </div>
        </div>
    `;

    document.querySelector('.modal').append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      modalDialog.classList.remove("hide");
      modalDialog.classList.add("show");
      closeModal(".modal");
    }, 3000);
  }
}

export default forms;