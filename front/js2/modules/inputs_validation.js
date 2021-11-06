const checkNumberInRange = ({min, max, value}) => {
    const parsedValue = parseInt(value);
    return (parsedValue && parsedValue >= min && parsedValue <= max);
}

const checkSelectedOption = ({ value }) => (!!value);

const checkText = ({ type, value }) => {
    switch(type) {
        case "email":
            return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(value);
        case "name":
            return /^[a-z ,\.'-]+$/i.test(value);
    }
};

const checkInput = (inputType, obj) => {
    switch(inputType) {
        case "range":
            return checkNumberInRange(obj);
        case "option":
            return checkSelectedOption(obj);
        case "text":
            return checkText(obj);
    }
};

export default checkInput;