const params = (new URL(document.location)).searchParams;
const confirmId = params.get("orderId") || null;


const displayConfirmId = orderId => {
    if (!orderId) {
        throw new Error("Le numéro de confirmation n'est pas lisible");
    }
    const idElem = document.getElementById("orderId");
    idElem.textContent = confirmId;
    return localStorage.clear();
};

displayConfirmId(confirmId);