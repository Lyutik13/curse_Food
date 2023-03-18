import { getResourse } from "../services/services";

function cards() {
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

    /*const getResourse = async (url) => {
        const res = await fetch(url);

        // обработка ошибки т.к. fetch не выдаёт ошибки 404 500 502 ... Ошибки для fetch это отсутствие интернета или критические ошибки.
        if (!res.ok) {
            throw new Error(`Could not fetch${url}, ststus: ${res.status}`);
        }

        return await res.json();
    };
    перенес в servises
    */

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

export default cards;
