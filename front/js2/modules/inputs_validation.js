import { displayInvalidInputMessage, removeInvalidInputMessage } from "./inputs_messages.js";

const checkNumberInRange = ({min, max, value}) => {
    const parsedValue = parseInt(value);
    return (parsedValue && parsedValue >= min && parsedValue <= max);
}

const checkSelectedOption = ({ value }) => (!!value);

const checkText = ({ type, value }) => {
    switch(type) {
        case "email":
            return /^[\w+.-]+@[a-z0-9.-]+.[a-z]$/i.test(value);
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
      input.addEventListener("change", () => {
        let valid = false;
        const type = input.type;
        switch (type) {
          case "number":
            valid = checkInput("range", { min: 1, max: 100, value: input.value });
            break;
          case "submit":
            break;
          default:
            valid = checkInput("text", { type: type, value: input.value });
        }
        if (!valid) {
          displayInvalidInputMessage(input);
        } else {
          removeInvalidInputMessage(input);
        }
      })
    );
  };

export { checkInput, validateInputs };