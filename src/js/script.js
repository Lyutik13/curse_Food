"use strict";

window.addEventListener("DOMContentLoaded", () => {
    // Tabs

    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");

    function hideTabcontent() {
        tabsContent.forEach((item) => {
            // item.style.display = "none";
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach((item) => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabcontent(i = 0) {
        // tabsContent[i].style.display = "block";
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabcontent();
    showTabcontent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabcontent();
                    showTabcontent(i);
                }
            });
        }
    });

    // Timer

    const deadline = "2023-03-13";

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            (days = 0), (hours = 0), (minutes = 0), (seconds = 0);
        } else {
            (days = Math.floor(t / (1000 * 60 * 60 * 24))),
                (seconds = Math.floor((t / 1000) % 60)),
                (minutes = Math.floor((t / 1000 / 60) % 60)),
                (hours = Math.floor((t / (1000 * 60 * 60)) % 24));
        }

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(".timer", deadline);

    // Modal
    const btnsModalTrigger = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal"),
        modalClose = document.querySelector("[data-close]");
    //  получение data атрибутов []

    // оптимизация за счёт функции открытия модального окна
    function openModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        //убираем повторное открытие модального окна
        clearInterval(modalTimerId);
    }

    btnsModalTrigger.forEach((btn) => {
        btn.addEventListener("click", openModal);
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
    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    modalClose.addEventListener("click", closeModal);
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
        if (e.target === modal) {
            closeModal();
            // modal.classList.add("hide");
            // modal.classList.remove("show");
            // document.body.style.overflow = "";
        }
    });

    // события при нажатии на клавишу esc
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });

    // Открытие модального окна по таймеру ф-я setTimeout
    const modalTimerId = setTimeout(openModal, 20000);

    // Открытие модального окна после прокрутки страницы до конца
    // высота клиентского окна + высота скрола >= всей высоте страницы
    function showModalByScroll() {
        if (
            document.documentElement.clientHeight + window.scrollY >=
            document.documentElement.scrollHeight
        ) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);

    // test my script
    // class Cart {
    //     constructor(
    //         // srsMenuItem,
    //         // subtitleMenuItem,
    //         // descrMenuItem,
    //         // priceMenuItem
    //     ) {
    //         // this.srsMenuItem = srsMenuItem;
    //         // this.subtitleMenuItem = subtitleMenuItem;
    //         // this.descrMenuItem = descrMenuItem;
    //         // this.priceMenuItem = priceMenuItem;
    //     }

    //     criateNewCart() {
    //         let srsMenuItem = "img/tabs/vegy.jpg";
    //         let subtitleMenuItem = "Меню “Фитнес”";
    //         let descrMenuItem =
    //             'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!';
    //         let priceMenuItem = 229;

    //         const div = document.createElement("div");
    //         const parentMenuItem = document.getElementById("newCart");

    //         div.className = "menu__item";
    //         div.innerHTML = `
    //         <img src="${srsMenuItem}" alt="imgCriateMenu">
    //         <h3 class="menu__item-subtitle">${subtitleMenuItem}</h3>
    //         <div class="menu__item-descr">${descrMenuItem}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${priceMenuItem}</span> грн/день</div>
    //         </div>`;
    //         parentMenuItem.prepend(div);
    //     }
    // }
    // let card = new Cart();
    // card.criateNewCart();

    // Используем классы карточек
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            // добавили ещё параметры (...classes) передающееся в масив!
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 74;
            // возвращаем изменённое значение price функцией changeToRUB
            this.changeToRUB();
        }
        // изменяем прайс из $ в RUB
        changeToRUB() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement("div");

            // проверка на то написан ни класс при render() (перебор масива, назначение значение по умолчанию)
            if (this.classes.length === 0) {
                this.element = "menu__item";
                element.classList.add(this.element);
            } else {
                this.classes.forEach((className) =>
                    element.classList.add(className)
                );
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>`;
            this.parent.append(element);
        }
    }

    // const card = new MenuCard(........);
    // card.render();
    // или не сохранять в переменную класс, тогда он создаться и удалиться!
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
        "menu__item"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Фитнес"',
        "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        15,
        ".menu .container",
        "menu__item"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        11,
        ".menu .container",
        "menu__item"
    ).render();

    // Form
    // form data format (no JSON!)
    const forms = document.querySelectorAll("form");

    const message = {
        loading: "Загрузка",
        success: "Спасибо! Скоро мы с вами свяжемся",
        error: "Что то пошло не так...",
    };

    forms.forEach((item) => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener("submit", (e) => {
            // отменяем стандартное поведение браузера
            e.preventDefault();

            // создаёт текстовое сообщение
            const statusMessage = document.createElement("div");
            statusMessage.classList.add("status");
            statusMessage.textContent = message.loading;
            // отправляем текстовое сообщение
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open("POST", "server.php");

            // при отправки через form data format (setRequestHeader) не нужен!
            // request.setRequestHeader("Content-type", "multipart/form-data");

            // всегда проверяй в верстке что бы в input был name=""
            const formData = new FormData(form);

            request.send(formData);

            request.addEventListener("load", () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    // очищаем форму после отправки
                    form.reset();
                    // удаляем сообщение через 2сек
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.error;
                }
            });
        });
    }
});
