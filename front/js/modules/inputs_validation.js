import { displayErrorMessage } from "./inputs_messages.js";

const checkNumberInRange = ({min, max, value}) => {
    const parsedValue = parseInt(value);
    console.log("parsedValue", parsedValue);
    return (parsedValue && parsedValue >= min && parsedValue <= max);
}

const checkSelectedOption = ({ value }) => (!!value);

const checkText = ({ type, value }) => {
  console.log(type, value);
    switch(type) {
        case "email":
            return /^[\w+.-]+@[a-z0-9.-]+\.[a-z]+$/i.test(value);
        case "text":
            return /^[\wéèàêâûùôï ,\.'-]+$/i.test(value);
    }
};

const checkInput = (inputType, obj) => {
    console.log("inputType : ", inputType);
    console.log("obj : ", obj);
    switch(inputType) {
        case "range":
            return checkNumberInRange(obj);
        case "option":
            return checkSelectedOption(obj);
        case "text":
            return checkText(obj);
    }
};

const deeperChecks = inputElem => {
  const type = inputElem.type;
  console.log(type);
  let valid = false;
  if (type === "number") {
    valid = checkInput("range", { min: 1, max: 100, value: inputElem.value });
    if (!valid) {
      displayErrorMessage("La valeur doit être un nombre entre 1 et 100", inputElem);
    }
    return;
  }
  valid = checkInput("text", { type: type, value: inputElem.value });
  if (!valid) {
    displayErrorMessage("La valeur entrée ne correspond pas une valeur correcte pour ce champ", inputElem);
  }
}

const validateInput = e => {
  console.log(e);
  if (e.target.validity.valid) return deeperChecks(e.target);
  const validityState = e.target.validity;
  if (validityState.valueMissing) displayErrorMessage("Une valeur doit être entrée", e.target);
  else if (validityState.typeMismatch || validityState.patternMismatch) displayErrorMessage("La valeur entrée ne correspond pas au type de valeur attendu", e.target);
  else if (validityState.rangeUnderflow) displayErrorMessage("La valeur entrée est inférieure à 1 ce qui est impossible", e.target);
  else if (validityState.rangeOverflow) displayErrorMessage("La valeur entrée est supérieure à 100 ce qui est impossible", e.target);
  else displayErrorMessage("Erreur dans ce champ", e.target);
}

const validateInputs = inputs => inputs.forEach(input => input.addEventListener("change", validateInput))

export { checkInput, validateInputs };