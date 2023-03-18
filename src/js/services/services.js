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

const getResourse = async (url) => {
    const res = await fetch(url);

    // обработка ошибки т.к. fetch не выдаёт ошибки 404 500 502 ... Ошибки для fetch это отсутствие интернета или критические ошибки.
    if (!res.ok) {
        throw new Error(`Could not fetch${url}, ststus: ${res.status}`);
    }

    return await res.json();
};

export { postData };
export { getResourse };
