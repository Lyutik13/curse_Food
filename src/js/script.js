"use strict";

import tabs from "./modules/tabs";
import timer from "./modules/timer";
import modal from "./modules/modal";
import cards from "./modules/cards";
import forms from "./modules/forms";
import slider from "./modules/slider";
import calc from "./modules/calc";
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
    // Открытие модального окна по таймеру ф-я setTimeout
    const modalTimerId = setTimeout(() => openModal(".modal", modalTimerId), 30000);

    tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    timer(".timer", "2023-04-13");
    modal("[data-modal]", ".modal", modalTimerId);
    cards();
    forms("form", modalTimerId);
    slider();
    calc();
});
