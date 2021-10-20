// const getCart = () => JSON.parse(localStorage.getItem("cart"));

const checkInput = inputValue => {
    const value = parseInt(inputValue);
    console.log(value);
    return value > 0 && value <= 100 ? value : 0;
};

const propagateChangesToLocalStorage = newItem => {
    const cart = getCart();
    const previousElemIndex = cart.findIndex(item => item.id === newItem.id);
    if (newItem.quantity < 0) {
        cart.splice(previousElemIndex, 1);
    } else {
        cart[previousElemIndex].quantity = newItem.quantity;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
};

const getItemWrapper = child => child.closest("article.cart__item");
const getProductId = elem => getItemWrapper(elem).dataset.id;

const cartItems = document.getElementById("cart__items");
const removeItem = elem => cartItems.removeChild(getItemWrapper(elem));

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
    return newCartItem = {
        id: getProductId(input),
        quantity: checkInput(input.value)
    };
};

const watchForInput = input => {
    input.addEventListener("change", () => {
        const newItem = inputHandler(input);
        propagateChangesToLocalStorage(newItem);
    });
}


const watchForChanges = () => {
    console.log("loaded");
    const inputs = Array.from(document.querySelectorAll(".itemQuantity"));
    console.log(inputs);
    inputs.map(input => watchForInput(input));
    const deleteButtons = Array.from(document.querySelectorAll("p.deleteItem"));
    console.log(deleteButtons);
    deleteButtons.map(button => watchForSuppression(button));
};

window.addEventListener("load", watchForChanges);