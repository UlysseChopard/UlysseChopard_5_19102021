import apiUrl from "./modules/api_url.js";
import displayProduct from "./modules/display_product.js";

const parentElem = document.querySelector("section.item > article");

console.log(apiUrl("id").href);

fetch(apiUrl("id"))
    .then(res => res.json())
    .then(product => displayProduct(parentElem, product))
    .catch(console.error);