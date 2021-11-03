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

export default displayValidation;