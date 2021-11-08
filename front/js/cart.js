import checkInputs from "./modules/inputs_checks.js";
import updateCart from "./modules/local_storage.js";
import { checkInput, validateInputs } from "./modules/inputs_validation.js";
import { sendOrder } from "./modules/send_order.js";

if (document.location.pathname.includes("/product.html")) {
  const addToCart = () => {
    const id = new URL(document.location).searchParams.get("id");
    const color = document.querySelector("select#colors").value;
    const quantity = parseInt(document.querySelector("input#quantity").value);
    
    if (
      !checkInput("range", { min: 1, max: 100, value: quantity }) ||
      !checkInput("option", { value: color })
      )
      return;
      
      const item = {
        id,
        color,
        quantity,
      };
      updateCart(item);
    };
    
    const addBtn = document.querySelector("button#addToCart");
    addBtn.addEventListener("click", addToCart);
    
  } else {

  import("./modules/display_cart.js")
    .then(module => module.displayCart())
    .then(() => {
      document.querySelector("form").addEventListener("submit", (e) => e.preventDefault());
      console.log([...document.querySelectorAll("input")])
      validateInputs([...document.querySelectorAll("input")]);
      const submit = document.querySelector("input#order");
      submit.addEventListener("click", () => sendOrder(document));
    })
    .catch(console.error);

}