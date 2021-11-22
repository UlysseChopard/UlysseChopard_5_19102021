import updateCart from "./modules/local_storage.js";
import { checkInput, validateInputs } from "./modules/inputs_validation.js";
import sendOrder from "./modules/send_order.js";
import { displayValidation } from "./modules/inputs_messages.js";
import { updateTotals } from "./modules/display_cart.js";
import displayShortcutButtons from "./modules/dynamic_buttons.js";

if (document.location.pathname.includes("/product.html")) {
  const checkQuantity = e => {
    const input = e.target;
    input.checkValidity();
    const val = parseInt(input.value);
    if (!val || val < 1 || val > 100 ) {
      input.value = 0;
    }
  };

  document.querySelector("input#quantity").addEventListener("change", checkQuantity);

  const resetAddBtnStyle = btn => {
    btn.textContent = "Ajouter au panier";
    btn.style.backgroundColor = "#2c3e50";
    return btn;
  };

  const addToCart = (e) => {
    const btn = e.target;
    const id = new URL(document.location).searchParams.get("id");
    const color = document.querySelector("select#colors").value;
    const quantity = parseInt(document.querySelector("input#quantity").value);

    if (!checkInput("option", { value: color })) {
      btn.textContent = "Une couleur doit être sélectionnée";
      displayValidation(btn, false);
      return;
    }
    
    if (!checkInput("range", { min: 1, max: 100, value: quantity })) {
        btn.textContent = "La quantité doit être un nombre compris entre 1 et 100";
        displayValidation(btn, false);
        return;
    }
      
      const item = {
        id,
        color,
        quantity,
      };

      updateCart(item);

      btn.textContent = "Ajouté au panier !"
      displayValidation(btn, true);
      displayShortcutButtons(btn.parentNode);
    };
    
    const addBtn = document.querySelector("button#addToCart");
    addBtn.addEventListener("mouseleave", (e) => setTimeout(resetAddBtnStyle, 2000, e.target));
    addBtn.addEventListener("click", addToCart);
    
  } else {

  import("./modules/display_cart.js")
    .then(module => module.displayCartAndTotals())
    .then(() => {
      validateInputs([...document.querySelectorAll("input")]);
      
      // document.querySelector("section#cart__items").addEventListener("change", updateTotals);
      document.querySelector("form").addEventListener("submit", (e) => e.preventDefault());
      document.querySelector("input#order").addEventListener("click", () => sendOrder(document));
    })
    .catch(console.error);

}