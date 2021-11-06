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

export default checkInput;