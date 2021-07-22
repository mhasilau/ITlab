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

export const passwordPower = password => {

  let passwordStrength;

  const passwordStrengthNum =  serPasswordLengthCheck(password) +
    userPasswordLowerCheck(password) +
    userPasswordUpperCheck(password) +
    userPasswordNumbersCheck(password) +
    userPasswordMinSymbolsCheck(password)

    console.log(passwordStrengthNum);
}
