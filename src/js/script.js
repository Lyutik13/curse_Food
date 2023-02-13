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

    btnsModalTrigger.forEach((btn) => {
        // перебераем всё тэги data-modal
        btn.addEventListener("click", () => {
            // 1-й вариант
            // modal.classList.toggle("show");
            // 2-й вариант
            modal.classList.add("show");
            modal.classList.remove("hide");
            document.body.style.overflow = "hidden";
            // убераем прокрутку страницы
        });
    });

    // оптимизация за счёт функции
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
});
