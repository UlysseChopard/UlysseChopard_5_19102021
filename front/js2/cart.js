import updateCart from "./modules/local_storage.js";
import { checkInput, validateInputs } from "./modules/inputs_validation.js";
import { displayInvalidInputMessage, removeInvalidInputMessage } from "./modules/inputs_messages.js";
import { sendOrder } from "./modules/send_order.js";
import displayCart from "./modules/display_cart.js";

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
  displayCart();

  document.querySelector("form").addEventListener("submit", (e) => e.preventDefault());
  validateInputs([...document.querySelectorAll("input")]);

  const submit = document.querySelector("input#order");
  submit.addEventListener("click", () => sendOrder(document));
}