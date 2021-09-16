export const emailRegex = RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
export const alphabetRegex = RegExp(/^[a-zA-Z ]+$/);
export const passwordRegex = RegExp(/^(?=.*[A-Za-z0-9])(?=.*[@$!%*#?&])[A-Za-z0-9\d@$!%*#?&]{8,}/);
export const mobileWidthLimit = 1024;

export function isValidName(input) {
    return (input === '' || alphabetRegex.test(input))
  }
export function isEmpty(input) {
    return (input === "" || input === undefined || input === null) ? true : false;
  }
  
 export function generateRandomValue() {
    var digits = Math.floor(Math.random() * 9000000000) + 1000000000;
    return digits;
  }

 export function isEmptyObject(value) {
    return Object.keys(value).length === 0 && value.constructor === Object;
  }