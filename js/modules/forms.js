function forms() {
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
}

module.exports = forms;