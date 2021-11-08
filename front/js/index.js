import displayProduct from "./modules/display_index.js";
import apiUrl from "./modules/api_url.js";

const parentElem = document.getElementById("items");

fetch(apiUrl())
    .then(res => res.json())
    .then(products => products.forEach(product => displayProduct(parentElem, product)))
    .catch(console.error);