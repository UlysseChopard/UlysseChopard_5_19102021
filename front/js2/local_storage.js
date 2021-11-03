const getCart = () => JSON.parse(localStorage.getItem("cart"));

const setCart = (items=[]) => localStorage.setItem("cart", JSON.stringify(items));

const addToCart = item => {
    const cart = getCart();
    cart.push(item);
    return setCart(cart);
}

const checkCart = item => {
    const cart = getCart();
    return cart.findIndex(prevItem => prevItem.id === item.id && prevItem.color === item.color);
};

const modifyItem = (index, item) => {
    const cart = getCart();
    cart[index].quantity += item.quantity;
    return setCart(cart);
};

const updateCart = item => {
    if (!getCart()) {
        setCart();
    }
    const prevIndex = checkCart(item);
    if (prevIndex === -1) {
        return addToCart(item);
    }
    return modifyItem(prevIndex, item);
};

export default updateCart;