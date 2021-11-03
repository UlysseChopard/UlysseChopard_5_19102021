const productId = new URL(document.location).searchParams.get("id");
const API_BASE_URL = "http://localhost:3000/api/products";
const fetchUrl = new URL(API_BASE_URL + "/" + productId);
const parentElem = document.querySelector("section.item > article");
console.log(parentElem);

const displayImg = (wrapper, product) => {
    const img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    wrapper.querySelector("div.item__img").appendChild(img);
};

const displayTitlePrice = (wrapper, product) => {
    const title = wrapper.querySelector("#title");
    title.textContent = product.name;
    const price = wrapper.querySelector("#price");
    price.textContent = product.price;
    
};

const displayDescription = (wrapper, product) => {
    const description = wrapper.querySelector("#description");
    description.textContent = product.description;
};

const displaySettings = (wrapper, product) => {
    const colors = wrapper.querySelector("#colors");
    product.colors.map(color => {
        const option = document.createElement("option");
        option.value = color;
        option.textContent = color;
        colors.appendChild(option);
    });
};

const displayItemContent = (wrapper, product) => {
    displayTitlePrice(wrapper, product);
    displayDescription(wrapper, product);
    displaySettings(wrapper, product);
};

const display = (wrapper, product) => {
    displayImg(wrapper, product);
    const parentElem= document.querySelector("div.item__content");
    displayItemContent(parentElem, product);
};

fetch(fetchUrl)
    .then(res => res.json())
    .then(product => display(parentElem, product))
    .catch(console.error);