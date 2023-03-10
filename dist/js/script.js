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

    //  /////////////// Modal ///////////////

    const btnsModalTrigger = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal");
    // modalClose = document.querySelector("[data-close]");
    //  ?????????????????? data ?????????????????? []

    // ?????????????????????? ???? ???????? ?????????????? ???????????????? ???????????????????? ????????
    function openModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        //?????????????? ?????????????????? ???????????????? ???????????????????? ????????
        clearInterval(modalTimerId);
    }

    btnsModalTrigger.forEach((btn) => {
        btn.addEventListener("click", openModal);
        // ???????????????????? ?????? ???????? data-modal
        // btn.addEventListener("click", () => {
        //     // 1-?? ??????????????
        //     // modal.classList.toggle("show");
        //     // 2-?? ??????????????
        //     modal.classList.add("show");
        //     modal.classList.remove("hide");
        //     document.body.style.overflow = "hidden";
        //     // ?????????????? ?????????????????? ????????????????
        // });
    });

    // ?????????????????????? ???? ???????? ?????????????? ???????????????? ???????????????????? ????????
    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    // modalClose.addEventListener("click", closeModal);

    // modalClose.addEventListener("click", () => {
    //     // 1-?? ??????????????
    //     // modal.classList.toggle("show");
    //     // 2-?? ??????????????
    //     modal.classList.add("hide");
    //     modal.classList.remove("show");
    //     document.body.style.overflow = "";
    //     // ?????????????????? ?????????????????? ???????????????? ?????????????????????? ????????????????
    // });

    // ???????????????? modal ???? ?????????? ?? ??????????????
    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") == "") {
            closeModal();
            // modal.classList.add("hide");
            // modal.classList.remove("show");
            // document.body.style.overflow = "";
        }
    });

    // ?????????????? ?????? ?????????????? ???? ?????????????? esc
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });

    // ???????????????? ???????????????????? ???????? ???? ?????????????? ??-?? setTimeout
    const modalTimerId = setTimeout(openModal, 30000);

    // ???????????????? ???????????????????? ???????? ?????????? ?????????????????? ???????????????? ???? ??????????
    // ???????????? ?????????????????????? ???????? + ???????????? ???????????? >= ???????? ???????????? ????????????????
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

    // ///////////////  ???????????????? ???????????????? JS-?????? ///////////////

    // ???????????????????? ???????????? ????????????????
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            // ???????????????? ?????? ?????????????????? (...classes) ???????????????????????? ?? ??????????!
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 75.75;
            // ???????????????????? ???????????????????? ???????????????? price ???????????????? changeToRUB
            this.changeToRUB();
        }
        // ???????????????? ?????????? ???? $ ?? RUB
        changeToRUB() {
            this.price = (this.price * this.transfer).toFixed(2);
        }

        render() {
            const element = document.createElement("div");

            // ???????????????? ???? ???? ?????????????? ???? ?????????? ?????? render() (?????????????? ????????????, ???????????????????? ???????????????? ???? ??????????????????)
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
                    <div class="menu__item-cost">????????:</div>
                    <div class="menu__item-total"><span>${this.price}</span> ??????/????????</div>
                </div>`;
            this.parent.append(element);
        }
    }

    // const card = new MenuCard(........);
    // card.render();
    // ?????? ???? ?????????????????? ?? ???????????????????? ??????????, ?????????? ???? ?????????????????? ?? ??????????????????!

    const getResourse = async (url) => {
        const res = await fetch(url);

        // ?????????????????? ???????????? ??.??. fetch ???? ???????????? ???????????? 404 500 502 ... ???????????? ?????? fetch ?????? ???????????????????? ?????????????????? ?????? ?????????????????????? ????????????.
        if (!res.ok) {
            throw new Error(`Could not fetch${url}, ststus: ${res.status}`);
        }

        return await res.json();
    };

    // ?????????????? ?????????? ???? ???????????? ???????? db.json
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
        '???????? "????????????"',
        '???????? "????????????" - ?????? ?????????? ???????????? ?? ?????????????????????????? ????????: ???????????? ???????????? ???????????? ?? ??????????????. ?????????????? ???????????????? ?? ???????????????? ??????????. ?????? ?????????????????? ?????????? ?????????????? ?? ?????????????????????? ?????????? ?? ?????????????? ??????????????????!',
        9,
        ".menu .container",
        "menu__item"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        '???????? "????????????"',
        "?? ???????? ???????????????????? ???? ???????????????????? ???? ???????????? ???????????????? ???????????? ????????????????, ???? ?? ???????????????????????? ???????????????????? ????????. ?????????????? ????????, ????????????????????????, ???????????? - ?????????????????????? ???????? ?????? ???????????? ?? ????????????????!",
        15,
        ".menu .container",
        "menu__item"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        '???????? "??????????????"',
        "???????? ???????????????????? - ?????? ???????????????????? ???????????? ????????????????????????: ???????????? ???????????????????? ?????????????????? ?????????????????? ??????????????????????????, ???????????? ???? ??????????????, ????????, ???????????? ?????? ????????????, ???????????????????? ???????????????????? ???????????? ???? ???????? ???????? ?? ?????????????????? ???????????????????????????? ??????????????.",
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
        success: "??????????????! ?????????? ???? ?? ???????? ????????????????",
        error: "?????? ???? ?????????? ???? ??????...",
    };

    forms.forEach((item) => {
        bindPostData(item);
    });

    // async/await ???????????? ?????? ?????????????????????? ?????? ???? ?????????????????? ???????????? ???? ?????????????? ?? ???? ???????????????? ???????????? ?????? ???????????? ?????? ?? ????????????????????!
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
            // ???????????????? ?????????????????????? ?????????????????? ????????????????
            e.preventDefault();

            // ?????????????? ?????????????????? ??????????????????
            const statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            // ???????????????????? ?????????????????? ??????????????????
            // form.append(statusMessage);
            form.insertAdjacentElement("afterend", statusMessage);

            // ???????????? ???????????????? ?? ?????????????? ?????? ???? ?? input ?????? name=""
            const formData = new FormData(form);

            // ?????????????? object ?? ?????????????????? ?????????? forEach ?????? ???????????????????????? JSON.stringify
            // const object = {};
            // formData.forEach(function (value, key) {
            //     object[key] = value;
            // });

            // entries() ???????????? ?????????? ?? ???????????? ?????? ???????????????????????????? ?? JSON
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // php ???? ?????????? ???????????????? ?? ?????????? ???????????????? ???????????? ???????????? ???????? server.php

            // fetch ???????????? XMLHttpRequest
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
                    // ?????????????? ??????????????????
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.error);
                })
                .finally(() => {
                    // ?????????????? ?????????? ?????????? ????????????????
                    form.reset();
                });
        });
    }

    //
    function showThanksModal(message) {
        const prevModalDialig = document.querySelector(".modal__dialog");
        // ???????????????? ??????????????
        prevModalDialig.classList.add("hide");
        openModal();

        // ?????????????? ?????????? ??????????????
        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        // ??????????????????
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
        // ???????????? ???????????? ???????????? * ??????-???? ??????????????
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

        // ?????????????? ??????????????????-??????????????????
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
            // ???????????????? ???? ?????????? ?????????? ?????????????????????????? (???????????????????? ??????????????????)
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
});
