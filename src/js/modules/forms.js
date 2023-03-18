import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
    // form data format (no JSON!) and with
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо! Скоро мы с вами свяжемся",
        error: "Что то пошло не так...",
    };

    forms.forEach((item) => {
        bindPostData(item);
    });

    // // async/await делаем код асинхронным что бы дождаться ответа от сервера и не получить ошибку что ничего нет в переменной!
    // const postData = async (url, data) => {
    //     const res = await fetch(url, {
    //         method: "POST",
    //         headers: {
    //             "Content-type": "application/json; charset=utf-8",
    //         },
    //         body: data,
    //     });

    //     return await res.json();
    // };
    // перенес ф-ю в папку services

    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            // отменяем стандартное поведение браузера
            e.preventDefault();

            // создаёт текстовое сообщение
            const statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            // отправляем текстовое сообщение
            // form.append(statusMessage);
            form.insertAdjacentElement("afterend", statusMessage);

            // всегда проверяй в верстке что бы в input был name=""
            const formData = new FormData(form);

            // создаем object и прогоняем через forEach для формирования JSON.stringify
            // const object = {};
            // formData.forEach(function (value, key) {
            //     object[key] = value;
            // });

            // entries() делает масив в масиве для преобразования в JSON
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // php не умеет работать с таким форматом данный смотри файл server.php

            // fetch вместо XMLHttpRequest
            // fetch("server.php", {
            //     method: "POST",
            //     headers: {
            //         "Content-type": "application/json; charset=utf-8",
            //     },
            //     body: JSON.stringify(object),
            // })

            postData("http://localhost:3000/requests", json)
                // .then((data) => data.text())
                .then((data) => {
                    console.log(data);
                    showThanksModal(message.success);
                    // удаляем сообщение
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.error);
                })
                .finally(() => {
                    // очищаем форму после отправки
                    form.reset();
                });
        });
    }

    //
    function showThanksModal(message) {
        const prevModalDialig = document.querySelector(".modal__dialog");
        // скрываем контент
        prevModalDialig.classList.add("hide");
        openModal(".modal", modalTimerId);

        // создаем новый контент
        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        // добавляем
        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialig.classList.add("show");
            prevModalDialig.classList.remove("hide");
            closeModal(".modal");
        }, 4000);
    }
}

export default forms;
