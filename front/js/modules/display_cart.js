import updateCart from "./local_storage.js";

const getItemInfo = (elem) => {
  const article = elem.closest("article");
  const id = article.dataset.id;
  const color = article.dataset.color;
  const quantity = parseInt(article.querySelector("input.itemQuantity").value);
  console.log({id, color, quantity});
  return {
    id,
    color,
    quantity
  };
};

const createImg = (item) => {
  const wrapper = document.createElement("div");
  const img = document.createElement("img");

  wrapper.classList = "cart__item__img";
  img.src = item.imageUrl;
  img.alt = item.altTxt;
  wrapper.appendChild(img);

  return wrapper;
};

const updatePrice = (e) => {
  const article = e.target.closest("article");
  const price = article.dataset.price;
  const newQuantity = getItemInfo(e.target).quantity;
  const priceElem = article.querySelector("div.cart__item__content__titlePrice > p");
  priceElem.innerHTML = newQuantity * price + " &euro;";
};

const createTitlePrice = (item) => {
  const wrapper = document.createElement("div");
  const title = document.createElement("h2");
  const price = document.createElement("p");

  wrapper.classList = "cart__item__content__titlePrice";
  title.textContent = item.name;
  price.innerHTML = item.price * item.quantity + " &euro;";
  wrapper.append(title, price);

  return wrapper;
};

const checkQuantity = (e) => {
  e.target.checkValidity();
  const validityState_Object = e.target.validity;
  console.log(validityState_Object);
  if (!validityState_Object.valid) {
    e.target.value = 0;
  }
  const newItem = getItemInfo(e.target);
  updateCart(newItem);
  updatePrice(e);
}

const createSettingsQuantity = (item) => {
  const wrapper = document.createElement("div");
  const quantity = document.createElement("p");
  const input = document.createElement("input");

  wrapper.classList = "cart__item__content__settings__quantity";
  quantity.textContent = "Qté : ";
  input.classList = "itemQuantity";
  input.name = "itemQuantity";
  input.type = "number";
  input.min = 1;
  input.max = 100;
  input.value = item.quantity;

  input.addEventListener("change", checkQuantity)

  wrapper.append(quantity, input);

  return wrapper;
};

const createSettingsColor = (item) => {
  const wrapper = document.createElement("div");
  const color = document.createElement("p");

  wrapper.classList = "cart__item__content__settings__color";
  color.textContent = "Couleur : " + item.color;
  wrapper.appendChild(color);

  return wrapper;
};

const displaySuccessOnDelete = (parentElem) => {
  const para = document.createElement("p");
  para.textContent = "Article supprimé !";
  parentElem.appendChild(para);
  const removePara = () => parentElem.removeChild(para);
  setTimeout(removePara, 3000)
};

const deleteItem = (e) => {
  const article = e.target.closest("article");

  // Propage le changement au total
  article.querySelector("input.itemQuantity").value = 0;
  article.querySelector("div.cart__item__content__titlePrice > p").textContent = "0";
  article.dispatchEvent(new Event("change", { bubbles: true }));

  // Propage au localStorage
  const item = getItemInfo(e.target);
  item.quantity = -1;
  updateCart(item);

  // Visuel
  displaySuccessOnDelete(article.parentNode);
  document.querySelector("section#cart__items").removeChild(article);
}

const createSettingsDelete = () => {
  const wrapper = document.createElement("div");
  const deleteBtn = document.createElement("p");

  wrapper.classList = "cart__item__content__settings__delete";
  deleteBtn.classList = "deleteItem";
  deleteBtn.textContent = "Supprimer";
  deleteBtn.addEventListener("click", deleteItem)

  wrapper.appendChild(deleteBtn);

  return wrapper;
};

const createSettings = (item) => {
  const wrapper = document.createElement("div");
  wrapper.classList = "cart__item__content__settings";
  wrapper.append(createSettingsColor(item), createSettingsQuantity(item), createSettingsDelete());

  return wrapper;
};

const createContent = (item) => {
  const wrapper = document.createElement("div");
  wrapper.classList = "cart__item__content";
  wrapper.append(createTitlePrice(item), createSettings(item));

  return wrapper;
};

const createArticle = (item) => {
  const article = document.createElement("article");
  article.classList = "cart__item";
  article.dataset.id = item._id;
  article.dataset.price = item.price;
  article.dataset.color = item.color;

  article.append(createImg(item), createContent(item));
  return article;
};

const updateTotalQuantity = () => {
  const totalQuantity = document.querySelector("#totalQuantity");
  const quantityInputs = [...document.querySelectorAll("input.itemQuantity")];
  totalQuantity.textContent = quantityInputs.map(input => parseInt(input.value)).reduce((acc, val) => acc += val, 0) || 0;
}

const updateTotalPrice = () => {
  const totalPrice = document.querySelector("#totalPrice");
  const prices = [...document.querySelectorAll("div.cart__item__content__titlePrice > p")];
  totalPrice.textContent = prices.map(price => parseInt(price.textContent)).reduce((acc, val) => acc += val, 0) || 0;
}

const updateTotals = () => {
  updateTotalPrice();
  updateTotalQuantity();
};

const displayItem = item => {
  return fetch(`http://localhost:3000/api/products/${item.id}`)
    .then(res => res.json())
    .then(itemInfo => createArticle({...itemInfo, ...item}))
    .then(cart => document.querySelector("section#cart__items").appendChild(cart))
    .catch(console.error);
};

const displayCart = () => Promise.all(updateCart().map(item => displayItem(item)));

const displayCartAndTotals = () => {
  return displayCart()
    .then(updateTotals)
    .then(() => document.querySelector("section#cart__items").addEventListener("change", updateTotals))
    .catch(console.error);
};


export { displayCartAndTotals, updateTotals };