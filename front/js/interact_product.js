import { Cart } from "./utils/cart.js";

const cart = new Cart();

const addBtn = document.getElementById("addToCart");

const displayInputErrorMsg = (error) => {
    const errorElem = document.createElement("p");
    errorElem.id = "alert__input";
    errorElem.textContent = error;
    return addBtn.parentNode.appendChild(errorElem);
};

const removeInputErrorMsg = () => {
    const parent = addBtn.parentNode;
    const alerts = [...parent.querySelectorAll("#alert__input")];
    if (alerts.length) {
        alerts.map(alert => parent.removeChild(alert));
    }  
};

const getColor =  () => document.getElementById("colors").value;

const getQuantity = () => {
    const quantity = parseInt(document.getElementById("quantity").value);
    return quantity > 0 ? quantity : 0;
};

const getProductId = () => new URL(document.location).searchParams.get("id");

// const setLocalStorage = () => localStorage.getItem("cart") ? true : localStorage.setItem("cart", "[]");

// const getCart = () => {
//     return JSON.parse(localStorage.getItem("cart"));
// };

// const setCart = item => {
//     const cart = getCart();
//     const previouslyAdded = cart.findIndex(elem => elem.id === item.id && elem.color === item.color);
//     if (previouslyAdded !== -1) {
//         cart[previouslyAdded].quantity += item.quantity
//     } else {
//         cart.push(item);
//     }
//     return localStorage.setItem("cart", JSON.stringify(cart));
// };

// const updateCart = (newItem) => {
//     const cart = new Cart();
//     const prevItem = cart.getCart.find(item => item.id === newItem.id);
//     if (prevItem) {
//         cart.modifyItem(prevItem, newItem);
//     } else {
//         cart.addItem(item);
//     }
// };

const addToCart = () => {
    const id = getProductId();
    const color = getColor();
    const quantity = getQuantity();

    // TODO : bien gérer l'affichage des erreurs

    if (!id) {
        displayInputErrorMsg("Le produit n'a pas été trouvé en base de données, veuillez réessayer plus tard");
        return;
    }

    if (!quantity) {
        displayInputErrorMsg("La quantité entrée est invalide. Veuillez entrer une quantité entre 0 et 100");
        return;
    }

    if (!color) {
        displayInputErrorMsg("Aucune couleur n'est sélectionnée. Veuillez choisir une couleur");
        return;
    }

    removeInputErrorMsg();

    const item = {
        id,
        color,
        quantity
    };

    cart.updateCart(item);
};

// setLocalStorage();

addBtn.addEventListener("click", addToCart);