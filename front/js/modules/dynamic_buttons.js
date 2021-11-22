const createButton = (parentElem, page = []) => {
    const anchor = document.createElement("a");
    const btn = document.createElement("button");
    anchor.href = page.pop();
    btn.type = "button";
    btn.textContent = page.pop();
    anchor.style.padding = "1rem";
    anchor.appendChild(btn);
    return parentElem.appendChild(anchor);
}

const displayShortcutButtons= (parentElem) => {
    if (parentElem.classList.contains("expanded")) return;
    parentElem.classList.add("expanded");
    const basicLinks = [
        [ "Accueil", "/front/html/index.html" ],
        [ "Panier", "/front/html/cart.html" ]
    ];
    basicLinks.forEach(page => createButton(parentElem, page));
}

export default displayShortcutButtons;