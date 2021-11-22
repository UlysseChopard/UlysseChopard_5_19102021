// import { displayInvalidInputMessage, removeInvalidInputMessage } from "./inputs_messages.js";

const checkNumberInRange = ({min, max, value}) => {
    const parsedValue = parseInt(value);
    console.log("parsedValue", parsedValue);
    return (parsedValue && parsedValue >= min && parsedValue <= max);
}

const checkSelectedOption = ({ value }) => (!!value);

const checkText = ({ type, value }) => {
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

const validateInputs = (inputs) => {
    inputs.map((input) =>
      input.addEventListener("change", (e) => {
        console.log(e.target);
        let valid = false;
        const input = e.target;
        const type = input.type;
        switch (type) {
          case "submit":
            break;
          case "number":
            valid = checkInput("range", { min: 1, max: 100, value: input.value });
            break;
          default:
            valid = checkInput("text", { type: type, value: input.value });
        }
        if (!valid) {
          input.setCustomValidity("Champ obligatoire");
        }
      })
    );
  };

export { checkInput, validateInputs };