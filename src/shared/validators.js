import {
  userNameValid,
  userEmailValid,
  userPasswordLengthValid,
  userPasswordLowerCaseValid,
  userPasswordUpperCaseValid,
  userPasswordNumbersValid,
  userPasswordMinSymbolsValid
} from './constants/regexp';


const userNameCheck = userName => userNameValid.test(userName);
const userEmailCheck = userEmail => userEmailValid.test(userEmail);
const serPasswordLengthCheck = password => userPasswordLengthValid.test(password);
const userPasswordLowerCheck = password => userPasswordLowerCaseValid.test(password);
const userPasswordUpperCheck = password => userPasswordUpperCaseValid.test(password);
const userPasswordNumbersCheck = password => userPasswordNumbersValid.test(password);
const userPasswordMinSymbolsCheck = password => userPasswordMinSymbolsValid.test(password);

const userNickname = document.getElementById('username');
const userEmail = document.getElementById('email');
const userPassword = document.getElementById('password');
const userConfirmPassword = document.getElementById('confirmPassword');

const lowerCaseCheck = password => {
  const result = userPasswordLowerCaseValid.test(password);
  return result;
}

const upperCaseCheck = password => userPasswordUpperCaseValid.test(password);

const numberCheck = password => userPasswordNumbersValid.test(password);

const lengthCheck = password => userPasswordLengthValid.test(password);

const symbolsCheck = password => userPasswordMinSymbolsValid.test(password);

export const nameValidator = userName => userNameCheck(userName);

export const emailValidator = email => userEmailCheck(email);

export const passwordPower = password => {

  const passwordStrengthNum = lengthCheck(password) +
    lowerCaseCheck(password) +
    upperCaseCheck(password) +
    numberCheck(password) +
    symbolsCheck(password)

    console.log(passwordStrengthNum);

    switch (passwordStrengthNum) {
      case 1:
        userPassword.classList.add('red');
        userPassword.classList.remove('orange');
        break;
      case 2:
        userPassword.classList.add('orange');
        userPassword.classList.remove('yellow');
        break;
      case 3:
        userPassword.classList.add('yellow');
        userPassword.classList.remove('blue');
        break;
      case 4:
        userPassword.classList.add('blue');
        userPassword.classList.remove('green');
        break;
      case 5:
        userPassword.classList.add('green');
        break;
      default:
        userPassword.classList.remove('red');
        break;
    }
    return passwordStrengthNum === 5;
}
