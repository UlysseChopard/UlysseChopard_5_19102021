import updateCart from "./local_storage.js";

const API_BASE_URL = "http://localhost:3000/api/products";

const checkUserInfo = (input) => {
    const patterns = {
        "default": /^[a-zâàéèêëîïôöûù -,']+$/i,
        "email": /^[\w+.-]+@[a-z0-9.-]+.[a-z]$/i,
        "address": /^([0-9]+)?[a-zâàéèêëîïôöûù -,']+$/i,
    };

    const matchingPattern = input.id === "email" || input.id === "address" ? patterns[input.id] : patterns["default"];
    return matchingPattern.test(input.value);
};

const createOrder = (workingDocument) => {
    const formInputs = [...workingDocument.querySelectorAll(".cart__order__form__question > input")];
    const checkedValues = formInputs.map(input => checkUserInfo(input) ? input : false);
    if (checkedValues.includes(false)) return;
    const userInfo = {};
    checkedValues.map(input => userInfo[input.id] =  input.value.toLowerCase());
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
    }).then(res => {
        if (!res.ok) throw new Error("Invalid input");
        res.json();
        workingDocument.location = "/front/html/confirmation.html?orderId=" + res.orderId;
    })
      .catch(console.error)
};

export default sendOrder;