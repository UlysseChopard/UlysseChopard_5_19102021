const API_URL = "http://localhost:3000/api/products/";

const getCart = () => JSON.parse(localStorage.getItem("cart"));

console.log(getCart());

const createItemBasis = (fetchedItem) => {
  const article = document.createElement("article");
  const imgWrapper = document.createElement("div");
  const img = document.createElement("img");
  const contentWrapper = document.createElement("div");
  const titlePriceWrapper = document.createElement("div");
  const title = document.createElement("h2");
  const price = document.createElement("p");

  article.classList.add("cart__item");
  article.dataset.id = fetchedItem.id;
  imgWrapper.classList.add("cart__item__img");
  img.src = fetchedItem.imageUrl;
  img.alt = fetchedItem.altText;
  contentWrapper.classList.add("cart__item__content");
  titlePriceWrapper.classList.add("cart__item__content__titlePrice");
  title.textContent = fetchedItem.name;
  price.textContent = fetchedItem.price;

  titlePriceWrapper.append(title, price);
  imgWrapper.appendChild(img);
  contentWrapper.append(titlePriceWrapper);
  article.append(imgWrapper, contentWrapper);
  return article;
};

const createSettings = (item) => {
  const settingsWrapper = document.createElement("div");
  const settingsQuantityWrapper = document.createElement("div");
  const quantity = document.createElement("p");
  const quantityInput = document.createElement("input");
  const deleteWrapper = document.createElement("div");
  const deleteButton = document.createElement("p");

  settingsWrapper.classList.add("cart__item__content__settings");
  settingsQuantityWrapper.classList.add(
    "cart__item__content__settings__quantity"
  );
  quantity.textContent = "Qté : ";
  quantityInput.type = "number";
  quantityInput.classList.add("itemQuantity");
  quantityInput.name = "itemQuantity";
  quantityInput.min = "1";
  quantityInput.amx = "100";
  quantityInput.value = item.quantity;
  deleteWrapper.classList.add("cart__item__content__settings__delete");
  deleteButton.classList.add("deleteItem");

  settingsQuantityWrapper.append(quantity, quantityInput);
  deleteWrapper.appendChild(deleteButton);
  settingsWrapper.append(settingsQuantityWrapper, deleteWrapper);
  return settingsWrapper;
};

const getCartUniqueIds = cart => Array.from(new Set(cart.map(item => item.id)));

const buildFetchUrls = cartUniqueIds => cartUniqueIds.map((item) => API_URL + item);

const cart = getCart();
const cartUniqueIds = getCartUniqueIds(cart);
const parentElem = document.getElementById("cart__items");
const settings = cart.map((item) => createSettings(item));

console.log(cartUniqueIds);

buildFetchUrls(cartUniqueIds).map((url) => {
  fetch(url)
    .then((res) => res.json())
    .then((item) => {
      console.log(item);
      const itemBasis = createItemBasis(item);
      const itemSettings = settings.shift();
      itemBasis.appendChild(itemSettings);
      parentElem.appendChild(itemBasis);
    })
    .catch((e) => console.error(e.message));
});
