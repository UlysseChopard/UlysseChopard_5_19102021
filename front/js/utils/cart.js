class Cart {
  constructor(items = []) {
    this.items = this.cart ? this.cart : items;
  }

  get cart() {
    return JSON.parse(localStorage.getItem("cart"));
  }

  set cart(cart) {
    return localStorage.setItem("cart", JSON.stringify(cart));
  }

  addItem(item) {
    const newCart = this.cart;
    newCart.push(item);
    return (this.cart = newCart);
  }

  modifyItem(prevItem, newItem) {
    let cartContent = this.cart;
    if (!newItem) {
      cartContent = cartContent.splice(cartContent.findIndex(prevItemI), 1);
      return (this.cart = cartContent);
    }
    const prevItemIndex = cartContent.findIndex(
      (item) => item.id === prevItem.id
    );
    // const prevItem = cartContent[prevItemIndex];
    const mergedItem = {
      id: prevItem.id,
      colors: [...new Set(prevItem.colors, newItem.colors)],
      quantity: prevItem.quantity + newItem.quantity,
    };
    cartContent[prevItemIndex] = mergedItem;
    return (this.cart = cartContent);
  }

    deleteItem(item) {
      return this.modifyItem(item);
    }

  //   updateQuantity(item, quantity) {
  //     const newItem = item;
  //     newItem.quantity = quantity;
  //     return this.modifyItem(item, newItem);
  //   }

  //   addColor(item, color) {
  //     const newItem = item;
  //     newItem.color.push(color);
  //     return this.modifyItem(item, newItem);
  //   }

  updateCart(item) {
      const cart = this.cart;
      console.log("cart", cart);
    const prevItem = cart.findIndex((prevItem) => prevItem.id === item.id);
    if (prevItem) {
      return this.modifyItem(prevItem, item);
    }
    return this.addItem(item);
  }
}

export { Cart };
