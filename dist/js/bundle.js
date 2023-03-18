/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((module) => {

function calc() {
    /////////////// Calculate ///////////////

    const result = document.querySelector(".calculating__result span");
    let sex, height, weight, age, ratio;

    if (localStorage.getItem("sex")) {
        sex = localStorage.getItem("sex");
    } else {
        sex = "female";
        localStorage.setItem("sex", "female");
    }

    if (localStorage.getItem("ratio")) {
        ratio = localStorage.getItem("ratio");
    } else {
        ratio = 1.2;
        localStorage.setItem("ratio", "female");
    }

    function calcTolal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "0000";
            return;
        }

        // Формула Харрисона-Бенедикта
        if (sex === "female") {
            result.textContent = Math.round(
                (655.1 + 9.563 * weight + 1.85 * height - 4.676 * age) * ratio
            );
        } else {
            result.textContent = Math.round(
                (66.5 + 13.75 * weight + 5.003 * height - 6.775 * age) * ratio
            );
        }
    }

    calcTolal();

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((elem) => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute("id") === localStorage.getItem("sex")) {
                elem.classList.add(activeClass);
            }
            if (
                elem.getAttribute("data-ratio") ===
                localStorage.getItem("ratio")
            ) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings("#gender div", "calculating__choose-item_active");
    initLocalSettings(
        ".calculating__choose_big div",
        "calculating__choose-item_active"
    );

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((elem) => {
            elem.addEventListener("click", (e) => {
                if (e.target.getAttribute("data-ratio")) {
                    ratio = +e.target.getAttribute("data-ratio");
                    // save in localStorage info
                    localStorage.setItem(
                        "ratio",
                        +e.target.getAttribute("data-ratio")
                    );
                } else {
                    sex = e.target.getAttribute("id");
                    // save in localStorage info
                    localStorage.setItem("sex", e.target.getAttribute("id"));
                }

                elements.forEach((elem) => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);
                calcTolal();
            });
        });
        /*document
            .querySelector(parentSelector)
            .addEventListener("click", (e) => {
                if (e.target.getAttribute("data-ratio")) {
                    ratio = +e.target.getAttribute("data-ratio");
                } else {
                    sex = e.target.getAttribute("id");
                }

                elements.forEach((elem) => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);
                calcTolal();
            });*/
    }

    getStaticInformation("#gender div", "calculating__choose-item_active");
    getStaticInformation(
        ".calculating__choose_big div",
        "calculating__choose-item_active"
    );

    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener("input", () => {
            // проверка на число через подсвечивания (регулярные выражения)
            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = "none";
            }

            switch (input.getAttribute("id")) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }
            calcTolal();
        });
    }

    getDinamicInformation("#height");
    getDinamicInformation("#weight");
    getDinamicInformation("#age");
}

module.exports = calc;


/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((module) => {

function cards() {
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
            this.transfer = 75.75;
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

}

module.exports = cards;

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((module) => {

function forms() {
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
}

module.exports = forms;

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((module) => {

function modal() {
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
    const modalTimerId = setTimeout(openModal, 30000);

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
}

module.exports = modal;

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((module) => {

function slider() {
    /////////////// Slider ///////////////

    const slides = document.querySelectorAll(".offer__slide"),
        slider = document.querySelector(".offer__slider"),
        slidePrev = document.querySelector(".offer__slider-prev"),
        slideNext = document.querySelector(".offer__slider-next"),
        current = document.querySelector("#current"),
        total = document.querySelector("#total"),
        slideWrapper = document.querySelector(".offer__slider-wrapper"),
        slideField = document.querySelector(".offer__slide-inner"),
        width = window.getComputedStyle(slideWrapper).width;
    let slideIndex = 1;
    let offset = 0;

    // Slider Pro how app
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slideField.style.width = 100 * slides.length + `%`;
    slideField.style.display = "flex";
    slideField.style.transition = "0.5s all";

    slideWrapper.style.overflow = "hidden";

    slides.forEach((slide) => {
        slide.style.width = width;
    });

    // navigation
    slider.style.position = "relative";

    const indicators = document.createElement("ol"),
        dots = [];

    indicators.classList.add("carousel-indicators");
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i + 1);
        dot.className = "dot";
        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function dotsOpacityStyle() {
        dots.forEach((dot) => (dot.style.opacity = ".5"));
        dots[slideIndex - 1].style.opacity = 1;
    }

    function eddCounterNumber() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    slideNext.addEventListener("click", () => {
        // ширина одного слайда * кол-во слайдов
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slideField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        eddCounterNumber();
        dotsOpacityStyle();
    });

    slidePrev.addEventListener("click", () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slideField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        eddCounterNumber();
        dotsOpacityStyle();
    });

    dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-to");

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slideField.style.transform = `translateX(-${offset}px)`;

            eddCounterNumber();
            dotsOpacityStyle();
        });
    });

    /*showSlides(slideIndex);

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
    */

}

module.exports = slider;


/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((module) => {

function tabs() {
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
}

module.exports = tabs;


/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((module) => {

function timer() {
    // ///////////////  Timer ///////////////
    const deadline = "2023-04-13";

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
}

module.exports = timer;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/


window.addEventListener("DOMContentLoaded", () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js"),
        forms = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js"),
        calc = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");

    tabs();
    timer();
    modal();
    cards();
    forms();
    slider();
    calc();

    console.log("dfgdfdsxcfbgfgdfhhfghfg");
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map