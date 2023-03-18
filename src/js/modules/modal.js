function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";

    //убираем повторное открытие модального окна
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const btnsModalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
    // modalClose = document.querySelector("[data-close]");
    //  получение data атрибутов []

    // оптимизация за счёт функции открытия модального окна
    // function openModal() {
    //     modal.classList.add("show");
    //     modal.classList.remove("hide");
    //     document.body.style.overflow = "hidden";
    //     //убираем повторное открытие модального окна
    //     clearInterval(modalTimerId);
    // }

    btnsModalTrigger.forEach((btn) => {
        btn.addEventListener("click", () => openModal(modalSelector, modalTimerId));
        // перебераем всё тэги data-modal
        // btn.addEventListener("click", () => {
        //     // 1-й вариант
        //     // modal.classList.toggle("show");
        //     // 2-й вариант
        //     modal.classList.add("show");
        //     modal.classList.remove("hide");
        //     document.body.style.overflow = "hidden";
        //     // убераем прокрутку страницы
        // });
    });

    // оптимизация за счёт функции закрытия модального окна
    // function closeModal() {
    //     modal.classList.add("hide");
    //     modal.classList.remove("show");
    //     document.body.style.overflow = "";
    // }

    // modalClose.addEventListener("click", closeModal);

    // modalClose.addEventListener("click", () => {
    //     // 1-й вариант
    //     // modal.classList.toggle("show");
    //     // 2-й вариант
    //     modal.classList.add("hide");
    //     modal.classList.remove("show");
    //     document.body.style.overflow = "";
    //     // возращаем прокрутку страницы стандартное значение
    // });

    // закрытие modal по клику в области
    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") == "") {
            closeModal(modalSelector);
        }
    });

    // события при нажатии на клавишу esc
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal(modalSelector);
        }
    });

    // // Открытие модального окна по таймеру ф-я setTimeout
    // const modalTimerId = setTimeout(openModal, 30000);

    // Открытие модального окна после прокрутки страницы до конца
    // высота клиентского окна + высота скрола >= всей высоте страницы
    function showModalByScroll() {
        if (
            document.documentElement.clientHeight + window.scrollY >=
            document.documentElement.scrollHeight
        ) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export { closeModal };
export { openModal };
