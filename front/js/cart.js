import updateCart from "./modules/local_storage.js";
import { checkInput, validateInputs } from "./modules/inputs_validation.js";
import sendOrder from "./modules/send_order.js";
import { displayValidation } from "./modules/inputs_messages.js";
import { updateTotals } from "./modules/display_cart.js";

if (document.location.pathname.includes("/product.html")) {
  const checkQuantity = e => {
    const input = e.target;
    input.checkValidity();
    const val = parseInt(input.value);
    if (!val || val < 1 || val > 100 ) {
      input.value = 0;
    }
  };

  const input = document.querySelector("input#quantity");
  input.addEventListener("change", checkQuantity);

  const resetAddBtnStyle = btn => {
    btn.textContent = "Ajouter au panier";
    btn.style.backgroundColor = "#2c3e50";
    return btn;
  };

  const addToCart = (e) => {
    const id = new URL(document.location).searchParams.get("id");
    const color = document.querySelector("select#colors").value;
    const quantity = parseInt(document.querySelector("input#quantity").value);
    
    if (
      !checkInput("range", { min: 1, max: 100, value: quantity }) ||
      !checkInput("option", { value: color })
      ) {
        e.target.textContent = "La couleur et la quantité doivent être renseignés";
        displayValidation(e.target, false);
        return;
      }
      
      const item = {
        id,
        color,
        quantity,
      };

      updateCart(item);

      e.target.textContent = "Ajouté au panier !"
      displayValidation(e.target, true);
    };
    
    const addBtn = document.querySelector("button#addToCart");
    addBtn.addEventListener("mouseleave", (e) => setTimeout(resetAddBtnStyle, 2000, e.target));
    addBtn.addEventListener("click", addToCart);
    
  } else {

  import("./modules/display_cart.js")
    .then(module => module.displayCart())
    .then(() => {
      updateTotals();
      document.querySelector("form").addEventListener("submit", (e) => e.preventDefault());
      validateInputs([...document.querySelectorAll("input")]);
      
      const submit = document.querySelector("input#order");
      submit.addEventListener("click", () => sendOrder(document));
    })
    .catch(console.error);

}