const BASE_URL = "http://localhost:3000/api/products/";
const PRODUCT_PAGE = "./product.html";

const buildProductElem = product => {
    const wrapper = document.createElement("a");
    const article = document.createElement("article");
    const img = document.createElement("img");
    const title = document.createElement("h3");
    const para = document.createElement("p");
    
    wrapper.href = PRODUCT_PAGE + "?id=" + product._id;
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    title.classList = "productName";
    title.textContent = product.name;
    para.classList = "productDescription";
    para.textContent = product.description;
    
    article.append(img, title, para);
    wrapper.appendChild(article);

    return wrapper;
};

const displayAllItems = parentElem => {
    fetch(BASE_URL)
        .then(res => res.json())
        .then(products => products.map(product => {
            const newChild = buildProductElem(product);
            parentElem.appendChild(newChild);
        }))
        .catch(e => console.error(e.message));
};

const itemsParent = document.getElementById("items");
displayAllItems(itemsParent);