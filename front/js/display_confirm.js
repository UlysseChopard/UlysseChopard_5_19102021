const params = (new URL(document.location)).searchParams;
const confirmId = parseInt(params.get("id")) || null;


const displayConfirmId = id => {
    if (!id) {
        throw new Error("Le numéro de confirmation n'est pas lisible");
    }
    const idElem = document.getElementById("orderId");
    idElem.textContent = confirmId;
    return localStorage.clear();
};

displayConfirmId(confirmId);