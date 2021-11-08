import displayProduct from "./modules/display_products.js";

const API_BASE_URL = "http://localhost:3000/api/products";
const fetchUrl = new URL(API_BASE_URL + "/");
const parentElem = document.getElementById("items");


fetch(fetchUrl)
    .then(res => res.json())
    .then(products => products.map(product => displayProduct(parentElem, product)))
    .catch(console.error);