const checkNumberInRange = ({min, max, value}) => {
    const parsedValue = parseInt(value);
    return (parsedValue >= min || parsedValue <= max);
}

const checkSelectedOption = ({ value }) => (!!value);

const checkInput = (inputType, obj) => {
    let result = false;
    switch(inputType) {
        case "range":
            result = checkNumberInRange(obj);
            break;
        case "option":
            result = checkSelectedOption(obj);
            break;
    }
    console.log(result);
    return result;
};

export default checkInput;