import {
  userNameValid,
  userEmailValid,
  userPasswordLengthValid,
  userPasswordLowerCaseValid,
  userPasswordNumbersValid,
} from './constants/regexp';

const userPassword = document.getElementById('password');

const userNameCheck = userName => userNameValid.test(userName);
const userEmailCheck = userEmail => userEmailValid.test(userEmail);
const lowerCaseCheck = password => userPasswordLowerCaseValid.test(password);
const numberCheck = password => userPasswordNumbersValid.test(password);
const lengthCheck = password => userPasswordLengthValid.test(password);

export const nameValidator = userName => userNameCheck(userName);

export const emailValidator = email => userEmailCheck(email);

export const passwordPower = password => {

  let passwordStrengthNum = lengthCheck(password) +
    lowerCaseCheck(password) +
    numberCheck(password);

    switch (passwordStrengthNum) {
      case 1:
        userPassword.classList.add('red');
        userPassword.classList.remove('yellow');
        break;
      case 2:
        userPassword.classList.add('yellow');
        userPassword.classList.remove('green');
        break;
      case 3:
        userPassword.classList.add('green');
        break;
      default:
        userPassword.classList.remove('red');
        break;
    }
  return passwordStrengthNum === 3;
}

