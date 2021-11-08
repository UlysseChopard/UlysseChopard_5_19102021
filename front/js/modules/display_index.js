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

const displayProduct = (wrapper, product) => {
    return wrapper.appendChild(createArticle(product));
};

export default displayProduct;