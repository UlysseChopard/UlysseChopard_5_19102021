const displayInvalidInputMessage = (inputElem) => {
  if (inputElem.parentNode.querySelector("p.invalidInput")) return;
  inputElem.classList.add(":invalid");
  const para = document.createElement("p");
  para.classList = "invalidInput";
  para.textContent = "Champ obligatoire";
  inputElem.parentNode.appendChild(para);
};

const removeInvalidInputMessage = (inputElem) => {
  inputElem.classList.replace(":invalid", ":valid");
  inputElem.parentNode.removeChild(
    inputElem.parentNode.querySelector("p.invalidInput")
  );
};

export { displayInvalidInputMessage, removeInvalidInputMessage };
