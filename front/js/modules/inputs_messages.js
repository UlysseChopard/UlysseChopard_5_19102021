// const displayInvalidInputMessage = (inputElem) => {
//   if (inputElem.parentNode.querySelector("p.invalidInput")) return;
//   inputElem.classList.add(":invalid");
//   const para = document.createElement("p");
//   para.classList = "invalidInput";
//   para.textContent = "Champ obligatoire";
//   inputElem.parentNode.appendChild(para);
// };

// const removeInvalidInputMessage = (inputElem) => {
//   inputElem.classList.replace(":invalid", ":valid");
//   const invalidMsg = inputElem.parentNode.querySelector("p.invalidInput");
//   if (invalidMsg) inputElem.parentNode.removeChild(invalidMsg);
// };
const removeErrorMsg = p => {
  p.textContent = "";
};

const displayErrorMessage = (msg, elem) => {
  const para = elem.parentNode.querySelector(`p#${elem.id}ErrorMsg`);
  if (!para) return;
  para.textContent = msg;
  setTimeout(removeErrorMsg, 2000, para);
}

const displaySuccess = elem => {
  elem.style.backgroundColor = "green";
  elem.style.color = "white";
  return elem;
};

const displayFailure = elem => {
  elem.style.backgroundColor = "red";
  elem.style.color = "white";
  return elem;
};

const displayValidation = (elem, success) => success ? displaySuccess(elem) : displayFailure(elem);

export { displayValidation, displayErrorMessage };
