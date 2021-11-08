// const addPattern = input => {
//     const patterns = {
//         "name": "^[\wâàéèêîïöôüûù -,']+$",
//         "address": "^[0-9]*[A-Za-z -,']+$",
//         "city": "^([A-Z][a-zâàéèêîïöôüûù]+)+$",
//         "email": "^[\w+.-]+@[a-z0-9.-]+.[a-z]$"
//     };
//     const adequatePattern = input.id.includes("Name") ? patterns["name"] : patterns[input.id];
//     input.setAttribute("pattern", adequatePattern);
// }

// const normalizeInputs = e => {
//     const input = e.target;
//     input.value.trim();
//     if (input.type === "number") {
//         const inputNumber = parseInt(input.value);
//         input.value = inputNumber > 0 ? inputNumber: -inputNumber;
//     }
// };

// const checkValidity = e => {
//     const input = e.target;
//     input.checkValidity();
//     const validityState_Object = input.validity;
//     if (validityState_Object.valueMissing) {
//         input.setCustomValidity("Ce champ doit être complété");
//     } else if (validityState_Object.rangeUnderflow) {
//         input.setCustomValidity("La quantité ne peut pa être inférieure à 1");
//     } else if (validityState_Object.rangeOverflow) {
//         input.setCustomValidity("La quantité ne peut pas dépasser 100");
//     } else if (validityState_Object.patternMismatch) {
//         const text = {
//             "firstName": "un prénom",
//             "lastName": "un nom de famille",
//             "address": "une adresse",
//             "email": "une adresse mail",
//             "city": "une ville"
//         }
//         input.setCustomValidity(`Ce champ doit contenir ${text[input.id]}`);
//     } else {
//         // input.setCustomValidity("");
//     }
// };

// const checkInputs = parentElem => {
//     const inputs = [...parentElem.querySelectorAll("input:not([type=submit])")];
//     inputs.forEach(input => addPattern(input));
//     inputs.forEach(input => input.addEventListener("input", (e) => {
//         normalizeInputs(e);
//         checkValidity(e)
//     }));
//     inputs.forEach(input => input.addEventListener("invalid", checkValidity));
// };

// export default checkInputs;