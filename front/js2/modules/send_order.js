import updateCart from "./local_storage.js";

const API_BASE_URL = "http://localhost:3000/api/products";

const createOrder = (workingDocument) => {
    const formInputs = [...workingDocument.querySelectorAll(".cart__order__form__question > input")];
    const userInfo = new Map(formInputs.map(input => [input.id, input.value]));
    const cartUniqueIds = [...new Set([...updateCart()].map(item => item.id))];
    return JSON.stringify({
        contact: userInfo,
        products: cartUniqueIds
    });
};

const sendOrder = (workingDocument) => {
    const postAdress = new URL(API_BASE_URL + "/order");
    return fetch(postAdress, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: createOrder(workingDocument)
    }).then(res => res.json())
};

export { sendOrder };