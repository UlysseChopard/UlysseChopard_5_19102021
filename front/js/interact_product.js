const addBtn = document.getElementById("addToCart");

const getColor =  () => document.getElementById("colors").value;

const getQuantity = () => {
    const quantity = parseInt(document.getElementById("quantity").value);
    return quantity > 0 ? quantity : 0;
};

const getProductId = () => new URL(document.location).searchParams.get("id");

const setLocalStorage = () => localStorage.getItem("cart") ? true : localStorage.setItem("cart", "[]");

const getCart = () => {
    return JSON.parse(localStorage.getItem("cart"));
};

const setCart = item => {
    const cart = getCart();
    const previouslyAdded = cart.findIndex(elem => elem.id === item.id && elem.color === item.color);
    if (previouslyAdded !== -1) {
        cart[previouslyAdded].quantity += item.quantity
    } else {
        cart.push(item);
    }
    return localStorage.setItem("cart", JSON.stringify(cart));
};

const addToCart = () => {
    const id = getProductId();
    const color = getColor();
    const quantity = getQuantity();

    console.log(id, color, quantity);

    if (!id) {
        return;
    }

    if (!quantity || !color) {
        // TODO : Afficher un message à l'utilisateur pour le prévenir de l'absence de quantité ou de couleur
        return;
    }

    const item = {
        id,
        color,
        quantity
    };

    setCart(item);
};

setLocalStorage();

addBtn.addEventListener("click", addToCart);