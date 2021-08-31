import moment from 'moment';
import {
  userNameValid,
  userEmailValid,
  userPasswordLengthValid,
  userPasswordCaseValid,
  userPasswordNumbersValid,
  userLinkedInValid,
  userGitValid
} from './constants/regexp';
import { CONSTANTS } from '../shared/constants/constants';


const userPassword = document.getElementById('password');

const userNameCheck = userName => userNameValid.test(userName);
const userEmailCheck = userEmail => userEmailValid.test(userEmail);
const lowerCaseCheck = password => userPasswordCaseValid.test(password);
const numberCheck = password => userPasswordNumbersValid.test(password);
const lengthCheck = password => userPasswordLengthValid.test(password);
const linkLinkedinCheck = link => link.match(userLinkedInValid);
const linkGitCheck = link => link.match(userGitValid);

export const nameValidator = userName => userNameCheck(userName);
export const linkLinkedinValidator = link => linkLinkedinCheck(link);
export const linkGitValidator = link => linkGitCheck(link);

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

export const ifNameIsValid = username => {
  const helpMessageUser = document.getElementById('usernameError');

  nameValidator(username) ?
    helpMessageUser.style.display = 'none' :
    helpMessageUser.style.display = 'block';
}

export const ifBDayIsValid = birthInp => {
  const year = moment().format();
  const birthYear = Number(birthInp.split('-')[0]);
  const birthMonth = Number(birthInp.split('-')[1]);
  const birthDay = Number(birthInp.split('-')[2]);
  const todayYear = Number(year.split('-')[0]);
  const todayMonth = Number(year.split('-')[1]);
  const todayDay = Number(Date().split(' ')[2]);
  const helpMessageBirth = document.getElementById('birthError');

  if (birthYear < todayYear && birthYear >= CONSTANTS.minYear) {
    helpMessageBirth.style.display = 'none';
  } else if (birthYear == todayYear && birthYear > CONSTANTS.minYear && birthMonth < todayMonth) {
    helpMessageBirth.style.display = 'none';
  } else if (birthYear == todayYear && birthYear > CONSTANTS.minYear && birthMonth == todayMonth && birthDay <= todayDay) {
    helpMessageBirth.style.display = 'none';
  } else helpMessageBirth.style.display = 'block';
}

export const ifGitIsValid = git => {
  const helpMessageGithub = document.getElementById('githubError');

  linkGitValidator(git) ?
    helpMessageGithub.style.display = 'none' :
    helpMessageGithub.style.display = 'block';
}

export const ifLinkIsValid = link => {
  const helpMessageLinkedin = document.getElementById('linkedinError');

  linkLinkedinValidator(link) ?
    helpMessageLinkedin.style.display = 'none' :
    helpMessageLinkedin.style.display = 'block';
}
