// const confirmCart = document.querySelector("div.cart__order");

const checkTextInput = field => {
    if (field.name.includes(/name/i)) {
        return /^[a-z ,\.'-]+$/i.test(field.value);
    }
    return /[A-Za-z0-9'\.\-\s\,]+/.test(field.value);
};

const checkEmailInput = field => {
    return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(field.value)
};

const handleInvalidity = field => {
    const messageBox = field.parentElement.querySelector(`#${field.name}ErrorMsg`);
    messageBox.textContent = "Champ invalide";
    field.classList.add(":invalid");
}

const clearErrorMsg = field => {
    const messageBox = field.parentElement.querySelector(`#${field.name}ErrorMsg`);
    messageBox.textContent = "";
    field.classList.remove(":invalid");
    field.classList.add(":valid");
}

const checkForValidity = field => {
    let validity = true;
    switch (field.name) {
        case "text":
            validity = checkTextInput(field);
            break;
        case "email":
            validity = checkEmailInput(field);
            break;
        default:
            break;
    }
    if (!validity) {
        handleInvalidity(field);
    } else {
        clearErrorMsg(field);
    }
};

const form = document.querySelector("form.cart__order__form");
const inputFields = Array.from(form.querySelectorAll("input:not(#order)"));
inputFields.map(field => field.addEventListener("change", () => checkForValidity(field)));


// Reprendre ICI

// const sendOrder = () => {
//     // Le localStorage fait foi
//     const cart = getCart();
//     const cartUniqueIds = Array.from(new Set(cart.map(item => item.id)));

//     const userInfo = {};
//     inputFields.map(field => userInfo[field.id] = field.value);

//     const order = JSON.stringify({
//         contact: userInfo,
//         products: cartUniqueIds
//     });

//     console.log(order);

//     fetch(API_URL + "order", {
//         method: "POST",
//         body: {
//             order
//         }
//     }).then(res => {
//         console.log(res)
//         res.json()
//     })
//       .then(data => document.location.pathname = "/front/html/confirmation.html") // TODO améliorer la forme
//       .catch(e => console.error(e.message));
// };

// const submit = form.querySelector("input#order");
// submit.addEventListener("click", sendOrder);

// {
//     "contact": {
//         "firstName": "testPrenom",
//         "lastName": "testNom",
//         "address": "1 rue test",
//         "city": "Paris",
//         "email": "test@test.fr"
//     },
//     "products": [ "107fb5b75607497b96722bda5b504926" ]
// }