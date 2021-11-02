import displayValidation from "./utils/input_check.js";
import copyToClipboard from "./utils/clipboard.js";

const params = (new URL(document.location)).searchParams;
const confirmId = params.get("orderId") || null;

const displayConfirmId = (orderId, elem) => {
    let success = false;
    const parentElem = elem.parentNode;
    if (!orderId) {
        displayValidation(parentElem, success);
        throw new Error("Le numéro de confirmation n'est pas lisible");
    }
    success = true;
    displayValidation(parentElem, success);
    elem.textContent = confirmId;
    return localStorage.clear();
};


const idElem = document.getElementById("orderId");
displayConfirmId(confirmId, idElem);
idElem.style.cursor = "pointer";
idElem.addEventListener("click", () => copyToClipboard(idElem.textContent));