import updateCart from "./local_storage.js";

const API_BASE_URL = "http://localhost:3000/api/products";

const createOrder = (workingDocument) => {
    const formInputs = [...workingDocument.querySelectorAll(".cart__order__form__question > input")];
    const userInfo = {};
    formInputs.map(input => userInfo[input.id] =  input.value.toLowerCase());
    console.log(userInfo);
    const cartUniqueIds = [...new Set([...updateCart()].map(item => item.id))];
    return JSON.stringify({
        contact: userInfo,
        products: cartUniqueIds
    });
};

const sendOrder = (workingDocument) => {
    console.log("sendOrder");
    const postAdress = new URL(API_BASE_URL + "/order");
    return fetch(postAdress, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: createOrder(workingDocument)
    }).then(res => res.json())
      .then(res => workingDocument.location = "/front/html/confirmation.html?orderId=" + res.orderId)
      .catch(console.error)
};

export { sendOrder };