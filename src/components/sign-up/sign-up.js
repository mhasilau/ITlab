import { signUp } from "../../api/api-handlers";
import { INFO_MESSAGE } from '../../shared/messages/info-message';
import { passwordPower, nameValidator, emailValidator } from '../../shared/validators';

const messageBlock = document.querySelector('.info-message');
const messageText = document.querySelector('.show-info-message');
const signUpForm = document.querySelector('.main_content_form');
const userNickname = document.getElementById('username');
const userEmail = document.getElementById('email');
const userPassword = document.getElementById('password');
const userConfirmPassword = document.getElementById('confirmPassword');
const submitBtnUp = document.getElementById('submitBtnUp')
const helpMessageUser = document.getElementById('usernameError');
const helpMessageEmail = document.getElementById('emailError');
const helpMessagePassword = document.getElementById('passwordError');
const helpMessageConfirmPassword = document.getElementById('passwordConfirmError');

const inputForm = {
  userName: {
    isValid: false
  },
  email: {
    isValid: false
  },
  password: {
    isValid: false
  },
  confirmPassword: {
    isValid: false
  }
}

export const showHidePasswordUp = () => {
  const password = document.querySelector('.textPassword');
  const confirm = document.querySelector('.textConfirm');

  password.onclick = () => {
    if (userPassword.type == 'password') {
      userPassword.type = 'text';
    } else userPassword.type = 'password';
  }

  confirm.onclick = () => {
    if (userConfirmPassword.type == 'password') {
      userConfirmPassword.type = 'text';
    } else userConfirmPassword.type = 'password';
  }

}

export const signUpHandler = () => {
  submitBtnUp.setAttribute('disabled', true);
  const loader = document.querySelector('.cssload-loading');
  loader.style.display = 'none';

  helpMessageUser.style.display = 'none';
  helpMessageEmail.style.display = 'none';
  helpMessagePassword.style.display = 'none';
  helpMessageConfirmPassword.style.display = 'none';

  helpMessageUser.innerText = 'Incorrect username. Click help';
  helpMessageEmail.innerText = 'Incorrect e-mail. Click help';
  helpMessagePassword.innerText = 'Please, enter correct password.';
  helpMessageConfirmPassword.innerText = 'Please, confirm your correct password';

  userNickname.oninput = () => {
    nameValidator(userNickname.value) ? inputForm.userName.isValid = true : inputForm.userName.isValid = false;
    if (inputForm.userName.isValid) {
      helpMessageUser.style.display = 'none';
      userNickname.classList.remove('red');
      userNickname.classList.add('green');
    } else {
      helpMessageUser.style.display = 'block';
      userNickname.classList.remove('green');
      userNickname.classList.add('red');
    }
    checkFormValid();
  }

  userEmail.oninput = () => {
    emailValidator(userEmail.value) ? inputForm.email.isValid = true : inputForm.email.isValid = false;
    if (inputForm.email.isValid) {
      userEmail.classList.add('green');
      userEmail.classList.remove('red');
      helpMessageEmail.style.display = 'none';
    } else {
      userEmail.classList.add('red');
      userEmail.classList.remove('green');
      helpMessageEmail.style.display = 'block';
    }
    checkFormValid();
  }

  userPassword.oninput = () => {
    if (password.value) {
      console.log(password.value);
      inputForm.password.isValid = passwordPower(password.value);
      helpMessagePassword.style.display = 'none';
    } else {
      inputForm.password.isValid = passwordPower(password.value);
      helpMessagePassword.style.display = 'block';
    }
    checkFormValid();
  }

  userConfirmPassword.oninput = () => {
    if (inputForm.password.isValid && ( userPassword.value === userConfirmPassword.value)) {
      inputForm.confirmPassword.isValid = true;
      helpMessageConfirmPassword.style.display = 'none';
    } else {
      inputForm.confirmPassword.isValid = false;
      helpMessageConfirmPassword.style.display = 'block';
    }
    checkFormValid();
  }

  const checkFormValid = () => {
    const isFormValid = Object.values(inputForm).every( value => value.isValid);
    isFormValid ? submitBtnUp.removeAttribute('disabled') : submitBtnUp.setAttribute('disabled', true);
  }

  signUpForm.addEventListener('submit', event => {
    event.preventDefault();

    const user = {
      username: userNickname.value,
      email: userEmail.value,
      password: userPassword.value,
      country: '',
      birth: '',
      linkedin: '',
      github: ''
    }

    signUp(user);
  });
}

export const showMessageBoardUp = () => {
  const usernameTip = document.getElementById('usernameTip');
  const emailTip = document.getElementById('emailTip');
  const passwordTip = document.getElementById('passwordTip');
  const confirmPasswordTip = document.getElementById('confirmPasswordTip');

  const message = () => {
    messageBlock.style.display = 'block';
    setTimeout( () => messageBlock.style.display = 'none', 3000)
  }

  usernameTip.onclick = () => {
    messageText.innerText = INFO_MESSAGE.username;
    message();
  }

  emailTip.onclick = () => {
    messageText.innerText = INFO_MESSAGE.email;
    message();
  }

  passwordTip.onclick = () => {
    messageText.innerText = INFO_MESSAGE.password;
    message();
  }

  confirmPasswordTip.onclick = () => {
    messageText.innerText = INFO_MESSAGE.confirmPassword;
    message();
  }
}

