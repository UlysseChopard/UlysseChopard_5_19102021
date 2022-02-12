const setCart = (items=[]) => localStorage.setItem("cart", JSON.stringify(items));

const getCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
        setCart();
    }
    return cart || [];
};


const add = (cart, item) => {
    cart.push(item);
    return setCart(cart);
}

const check = (cart, item) => {
    return cart.findIndex(prevItem => prevItem.id === item.id && prevItem.color === item.color);
};

const modify = (cart, item, index) => {
    // Permet d'ajouter la quantité voulue à chaque clic sur la page product.html
    if (document.location.pathname.includes("product.html")) {
        item.quantity += cart[index].quantity;
    }
    cart[index] = {...cart[index], ...item};
    return setCart(cart);
};

const del = (cart, index) => {
    cart.splice(index, 1);
    return setCart(cart);
};

const updateCart = item => {
    const cart = getCart();
    if (!item) {
        return cart;
    }
    const prevIndex = check(cart, item);

    if (prevIndex === -1) {
        add(cart, item);
    } else if (item.quantity <= 0) {
        del(cart, prevIndex);
    } else {
        modify(cart, item, prevIndex);
    }
};

export default updateCart;