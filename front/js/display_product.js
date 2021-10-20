const PRODUCT_API = "http://localhost:3000/api/products/";

const url = new URL(document.location)
const id = url.searchParams.get("id");

const fetchAdress = PRODUCT_API + id;

const buildProductElem = product => {
    const imgWrapper = document.querySelector("div.item__img");
    const colorsWrapper = document.getElementById("colors");

    const title = document.getElementById("title");
    const price = document.getElementById("price");
    const desc = document.getElementById("description");

    const img = document.createElement("img");
    const colorsOptions = product.colors.map(color => {
        const newElem = document.createElement("option")
        newElem.value = color;
        newElem.textContent = color;
        return newElem;
    });

    img.src = product.imageUrl;
    img.alt = product.altTxt;
    title.textContent = product.name;
    price.textContent = product.price;
    desc.textContent = product.description;

    imgWrapper.appendChild(img);
    colorsOptions.map(option => colorsWrapper.appendChild(option));
};

const displayProduct = adress => {
    if (adress) {
        fetch(adress)
            .then(res => res.json())
            .then(product => {
                console.log(product);
                buildProductElem(product);
            })
            .catch(e => console.error(e.message));
    } else {
        throw new Error("Parametre id manquant");
    }
};

displayProduct(fetchAdress);