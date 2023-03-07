"use strict";

window.addEventListener("DOMContentLoaded", () => {
    // /////////////// Tabs ///////////////

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

    // ///////////////  Timer ///////////////

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

    //  /////////////// Modal ///////////////
    const btnsModalTrigger = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal");
    // modalClose = document.querySelector("[data-close]");
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

    // ///////////////  создание карточек JS-сом ///////////////
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
            this.transfer = 76.02;
            // возвращаем изменённое значение price функцией changeToRUB
            this.changeToRUB();
        }
        // изменяем прайс из $ в RUB
        changeToRUB() {
            this.price = (this.price * this.transfer).toFixed(2);
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

    const getResourse = async (url) => {
        const res = await fetch(url);

        // обработка ошибки т.к. fetch не выдаёт ошибки 404 500 502 ... Ошибки для fetch это отсутствие интернета или критические ошибки.
        if (!res.ok) {
            throw new Error(`Could not fetch${url}, ststus: ${res.status}`);
        }

        return await res.json();
    };

    // Создаем карты из данныз бэка db.json
    getResourse("http://localhost:3000/menu").then((data) => {
        data.forEach(({ img, altimg, title, descr, price }) => {
            new MenuCard(
                img,
                altimg,
                title,
                descr,
                price,
                ".menu .container"
            ).render();
        });
    });

    /*
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
    */

    // ///////////////  Form ///////////////
    // form data format (no JSON!) and with
    const forms = document.querySelectorAll("form");

    const message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо! Скоро мы с вами свяжемся",
        error: "Что то пошло не так...",
    };

    forms.forEach((item) => {
        bindPostData(item);
    });

    // async/await делаем код асинхронным что бы дождаться ответа от сервера и не получить ошибку что ничего нет в переменной!
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=utf-8",
            },
            body: data,
        });

        return await res.json();
    };

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
        openModal();

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
            closeModal();
        }, 4000);
    }

    /////////////// Slider ///////////////
    const slides = document.querySelectorAll(".offer__slide"),
        slidePrev = document.querySelector(".offer__slider-prev"),
        slideNext = document.querySelector(".offer__slider-next"),
        current = document.querySelector("#current"),
        total = document.querySelector("#total");
    let slideIndex = 1;

    showSlides(slideIndex);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => (item.style.display = "none"));

        slides[slideIndex - 1].style.display = "block";

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function plusSlides(n) {
        showSlides((slideIndex += n));
    }

    slidePrev.addEventListener("click", () => {
        plusSlides(-1);
    });

    slideNext.addEventListener("click", () => {
        plusSlides(1);
    });
});
