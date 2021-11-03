const API_BASE_URL = "http://localhost:3000/api/products";
const fetchUrl = new URL(API_BASE_URL + "/");
const parentElem = document.getElementById("items");

const createAnchor = product => {
    const anchor = document.createElement("a");
    anchor.href = "./product.html?id=" + product._id;
    return anchor;
};

const createImg = product => {
    const img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    return img;
};

const createTitle = product => {
    const title = document.createElement("h3");
    title.classList = "productName";
    title.textContent = product.name;
    return title;
};

const createPara = product => {
    const para = document.createElement("p");
    para.classList = "productDescription";
    para.textContent = product.description;
    return para;
};

const createArticle = product => {
    const article = document.createElement("article");
    article.append(createImg(product), createTitle(product), createPara(product));
    const anchor = createAnchor(product);
    anchor.appendChild(article);    
    return anchor;
};

const display = (wrapper, product) => {
    return wrapper.appendChild(createArticle(product));
};

fetch(fetchUrl)
    .then(res => res.json())
    .then(products => products.map(product => display(parentElem, product)))
    .catch(console.error);