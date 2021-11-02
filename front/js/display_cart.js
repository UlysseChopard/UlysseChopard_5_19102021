import { Cart } from "./utils/cart.js";

const cart = new Cart();

console.log(cart.getCart);

const API_BASE_URL = "http://localhost:3000/api/products/";

// const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];

const createItemBasis = (fetchedItem) => {
  const article = document.createElement("article");
  const imgWrapper = document.createElement("div");
  const img = document.createElement("img");
  const contentWrapper = document.createElement("div");
  const titlePriceWrapper = document.createElement("div");
  const title = document.createElement("h2");
  const price = document.createElement("p");

  article.classList.add("cart__item");
  article.dataset.id = fetchedItem._id;
  article.dataset.color = fetchedItem.color;
  imgWrapper.classList.add("cart__item__img");
  img.src = fetchedItem.imageUrl;
  img.alt = fetchedItem.altTxt;
  contentWrapper.classList.add("cart__item__content");
  titlePriceWrapper.classList.add("cart__item__content__titlePrice");
  title.textContent = fetchedItem.name;
  price.innerHTML = fetchedItem.price + " &euro;";

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

  // Rajout pour la couleur
  const color = document.createElement("p");

  settingsWrapper.classList.add("cart__item__content__settings");
  settingsQuantityWrapper.classList.add(
    "cart__item__content__settings__quantity"
  );
  quantity.textContent = "Qté : ";
  quantityInput.type = "number";
  quantityInput.classList.add("itemQuantity");
  quantityInput.name = "itemQuantity";
  quantityInput.min = "1";
  quantityInput.max = "100";
  quantityInput.setAttribute("value", item.quantity);
  deleteWrapper.classList.add("cart__item__content__settings__delete");
  deleteButton.classList.add("deleteItem");
  deleteButton.textContent = "Supprimer";

  // Rajout pour la couleur
  color.textContent = "Couleur : " + item.color;

  settingsQuantityWrapper.append(quantity, quantityInput);
  deleteWrapper.appendChild(deleteButton);
  // Rajout pour la couleur
  settingsWrapper.append(color, settingsQuantityWrapper, deleteWrapper);
  return settingsWrapper;
};

const createCartItem = (item, parent) => {
  const itemBasis = createItemBasis(item);
  const itemSettings = createSettings(item);
  const settingsParent = itemBasis.querySelector(".cart__item__content");
  settingsParent.appendChild(itemSettings);
  return parent.appendChild(itemBasis);
};

const mergeCartAndAPI = (cartItem, fetchedInfos) => {
  fetchedInfos.color = cartItem.color;
  fetchedInfos.quantity = cartItem.quantity;
  return fetchedInfos;
}

const getCartIds = (cart) => cart.getCart.map((item) => item.id);

const buildFetchUrls = (cartUniqueIds) =>
  cartUniqueIds.map((item) => API_BASE_URL + item);

const cartContent = cart.getCart;
const cartIds = getCartIds(cartContent);
const parentElem = document.getElementById("cart__items");
// const settings = cart.map((item) => createSettings(item));

// buildFetchUrls(cartIds).map((url) => {
//   fetch(url)
//     .then((res) => res.json())
//     .then((item) => {
//       const itemBasis = createItemBasis(item);
//       // Possible puisqu'on utilise d'un côté un pile (cart) et de l'autre un extrait de cette pile (cartIds)
//       const itemSettings = settings.shift();
//       const settingsParent = itemBasis.querySelector(".cart__item__content");
//       settingsParent.appendChild(itemSettings);
//       parentElem.appendChild(itemBasis);
//     })
//     .catch((e) => console.error(e.message));
// });

const fetchUrls = buildFetchUrls(cartIds);

// Récupérer la liste d'articles depuis l'API
fetchUrls.map((url) => {
  fetch(url)
    .then((res) => res.json())
    // Créer les articles
    .then((item) => {
      const cartSpecifics = cartContent.shift();
      // Bricolage pour récupérer la couleur et pouvoir lui attribuer un dataset sur l'élément article
      // item.color = cartSpecifics.color;
      // item.quantity = cartSpecifics.quantity;
      // const itemBasis = createItemBasis(item);
      // const itemSettings = createSettings(cartSpecifics);
      // const settingsParent = itemBasis.querySelector(".cart__item__content");
      // settingsParent.appendChild(itemSettings);
      // parentElem.appendChild(itemBasis);
      const completeNewItem = mergeCartAndAPI(cartSpecifics, item);
      createCartItem(completeNewItem, parentElem);
    })
    .catch((e) => console.error(e.message));
});
