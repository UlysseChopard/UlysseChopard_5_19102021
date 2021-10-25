// Todo : retenir les valeurs calculées dans le localstorage
// pour éviter leur disparition au rechargement

const checkInput = inputValue => {
    const value = parseInt(inputValue);
    console.log(value);
    return value > 0 && value <= 100 ? value : 0;
};

const propagateChangesToLocalStorage = newItem => {
    const cart = getCart();
    const previousElemIndex = cart.findIndex(item => item.id === newItem.id && item.color === newItem.color);
    if (newItem.quantity < 0) {
        cart.splice(previousElemIndex, 1);
    } else {
        cart[previousElemIndex].quantity = newItem.quantity;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
};

const getItemWrapper = child => child.closest("article.cart__item");

const getProductId = elem => getItemWrapper(elem).dataset.id;

const getProductColor = elem => getItemWrapper(elem).dataset.color;

const removeItem = elem => document.getElementById("cart__items").removeChild(getItemWrapper(elem));

const deleteButtonHandler = button => {
    return deleteOrder = {
        id: getProductId(button),
        quantity: -1
    };
};

const watchForSuppression = button => {
    button.addEventListener("click", () => {
        const deleteOrder = deleteButtonHandler(button);
        console.log(deleteOrder);
        propagateChangesToLocalStorage(deleteOrder);
        removeItem(button);
    });
};

const inputHandler = input => {
    return {
        id: getProductId(input),
        color: getProductColor(input),
        quantity: checkInput(input.value)
    };
};

const watchForInput = input => {
    input.addEventListener("change", () => {
        const newItem = inputHandler(input);
        // Permet d'éviter une désynchronisation entre les valeurs du localStorage
        // entre 0 et 100 et celle affichées et qui permettent de calculer le nombre d'items
        // et le prix
        input.value = newItem.quantity;
        propagateChangesToLocalStorage(newItem);
    });
};

const getPriceForProduct = item => {
    return parseInt(item.querySelector(".cart__item__content__titlePrice > p").textContent);
};

const getQuantityForProduct = item => {
    const val = parseInt(item.querySelector("input.itemQuantity").value);
    return val > 0 ? val : 0; 
}

const calculateTotalPrice = () => {
    const items = Array.from(document.querySelectorAll("article.cart__item"));
    return items.reduce((acc, item) => acc += getPriceForProduct(item) * getQuantityForProduct(item), 0)
};

const recapHandler = () => {
    const totalQuantity = document.getElementById("totalQuantity");
    const numProducts = Array.from(document.querySelectorAll("article.cart__item"));
    const numItems = numProducts.reduce((acc, item) => acc += getQuantityForProduct(item), 0);
    totalQuantity.textContent = numItems;
    const totalPrice = document.getElementById("totalPrice");
    totalPrice.textContent = calculateTotalPrice();
};

const watchForRecap = () => {
    document.getElementById("cart__items").addEventListener("change", recapHandler);
};

const watchForChanges = () => {
    recapHandler();
    const inputs = Array.from(document.querySelectorAll(".itemQuantity"));
    console.log(inputs);
    inputs.map(input => watchForInput(input));
    const deleteButtons = Array.from(document.querySelectorAll("p.deleteItem"));
    console.log(deleteButtons);
    deleteButtons.map(button => watchForSuppression(button));
    watchForRecap();
};


window.addEventListener("load", watchForChanges);