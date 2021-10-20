const checkTextInput = field => {
    if (field.name.includes(/name/i)) {
        console.log("passé par ici");
        return /^[a-z ,\.'-]+$/i.test(field.value);
    }
    return /[A-Za-z0-9'\.\-\s\,]+/.test(field.value);
};

const checkEmailInput = field => {
    return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(field.value)
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
    field.value.trim();
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

const sendOrder = () => {
    // Le localStorage fait foi
    const cart = getCart();

    // C'est bizarre de n'envoyer qu'une liste d'ids uniques sans la couleur ni la quantité,
    //  mais probablement une simplification pour l'exercice
    const cartUniqueIds = Array.from(new Set(cart.map(item => item.id)));

    const userInfo = {};
    inputFields.map(field => userInfo[field.id] = field.value);

    const order = JSON.stringify({
        contact: userInfo,
        products: cartUniqueIds
    });

    console.log(order);

    fetch(new URL(API_URL + "order"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            order
        }
    })
      .then(res => {
          const newLocation = document.location;
          newLocation.pathname =  "/front/html/confirmation.html";
          newLocation.searchParams.set("orderId", res.body.orderId);
          console.log(newLocation.searchParams, res.body.orderId);
          return document.location = newLocation;
    }) // TODO améliorer la forme
      .catch(e => console.error(e.message));
};

form.addEventListener("submit", event => {
    event.preventDefault()
    sendOrder();
});

// Exemple d'objet à envoyer pour la commande
// 
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