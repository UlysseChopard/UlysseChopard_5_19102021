import updateCart from "./local_storage.js";

const API_BASE_URL = "http://localhost:3000/api/products";

const checkUserInfo = (input) => {
    input.checkValidity();
    const patterns = {
        "default": /^[a-zâàéèêëîïôöûù\s-,']+$/i,
        "email": /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
        "address": /^([0-9]+)?[a-zâàéèêëîïôöûù -,']+$/i,
    };

    const matchingPattern = input.id === "email" || input.id === "address" ? patterns[input.id] : patterns["default"];
    console.log(input.value, matchingPattern, matchingPattern.test(input.value));
    return !!input.value && matchingPattern.test(input.value);
};

const createOrder = (workingDocument) => {
    const formInputs = [...workingDocument.querySelectorAll(".cart__order__form__question > input")];
    const checkedValues = formInputs.map(input => checkUserInfo(input) ? input : false);
    if (checkedValues.includes(false)) return false;
    const userInfo = {};
    checkedValues.map(input => userInfo[input.id] =  input.value.trim().toLowerCase());
    const cartUniqueIds = [...new Set([...updateCart()].map(item => item.id))];
    return JSON.stringify({
        contact: userInfo,
        products: cartUniqueIds
    });
};

const displayInvalidOrder = (btn) => {
    btn.value = "Erreur dans la commande";
    btn.style.backgroundColor = "red";
    return btn;
};

const resetOrderBtnStyle = (btn) => {
    btn.value = "Commander !";
    btn.style.backgroundColor = "#2c3e50";
    return btn;
};

const displayErrorMsg = () => {
    const orderBtn = document.getElementById("order");
    displayInvalidOrder(orderBtn);
    setTimeout(resetOrderBtnStyle, 1000, orderBtn);
};


const sendOrder = (workingDocument) => {
    const postAdress = new URL(API_BASE_URL + "/order");
    const order = createOrder(workingDocument);
    const errorMsg = "Invalid input";
    if (!order) {
        displayErrorMsg();
        return false;
    }
    return fetch(postAdress, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: order
    }).then(res => {
        if (!res.ok) throw new Error(errorMsg);
        return res.json();
    })
      .then((res) => workingDocument.location = "/front/html/confirmation.html?orderId=" + res.orderId)
      .catch(e => {
          console.error(e);
          if (e.message === errorMsg) {
              displayErrorMsg();
          }
      });
};

export default sendOrder;