
import updateCart from "./local_storage.js";
import checkInput from "./inputs_validation.js";

if (document.location.pathname.includes("/product.html")) {
    const addToCart = () => {
        const id = new URL(document.location).searchParams.get("id");
        const color = document.querySelector("select#colors").value;
        const quantity = parseInt(document.querySelector("input#quantity").value);

        if (!checkInput("range", { min: 1, max: 100, value: quantity }) || !checkInput("option", { value: color })) return;
        
        const item = {
            id,
            color,
            quantity
        };
        updateCart(item);
    };

    const addBtn = document.querySelector("button#addToCart");
    addBtn.addEventListener("click", addToCart);
} else {

}