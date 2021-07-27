import { signUp, signIn } from "../../api/api-handlers";
import { setUserEmail, setToken } from "../../shared/local-storage/ls-config";
import { INFO_MESSAGE } from '../../shared/messages/info-message';
import { passwordPower, nameValidator, emailValidator } from '../../shared/validators';
import { routes, paths } from '../../shared/constants/routes';
import { showErrorNotification } from '../../shared/error-handlers';

const messageBlock = document.querySelector('.info-message');
const messageText = document.querySelector('.show-info-message');

const signUpForm = document.querySelector('.main_content_form');
const userNickname = document.getElementById('username');
const userEmail = document.getElementById('email');
const userPassword = document.getElementById('password');
const userConfirmPassword = document.getElementById('confirmPassword');
const submitBtnUp = document.getElementById('submitBtnUp')

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

  userNickname.oninput = () => {
    nameValidator(userNickname.value) ? inputForm.userName.isValid = true : inputForm.userName.isValid = false;
    if (inputForm.userName.isValid) {
      userNickname.classList.add('green');
    } else userNickname.classList.add('red');
    checkFormValid();
  }

  userEmail.oninput = () => {
    emailValidator(userEmail.value) ? inputForm.email.isValid = true : inputForm.email.isValid = false;
    if (inputForm.email.isValid) {
      userEmail.classList.add('green');
    } else userEmail.classList.add('red');
    checkFormValid();
  }

  userPassword.oninput = () => {
    if (password.value) {
      inputForm.password.isValid = passwordPower(password.value);
    } else inputForm.password.isValid = passwordPower(password.value);
    
    checkFormValid();
  }

  userConfirmPassword.oninput = () => {
    if (inputForm.password.isValid && ( userPassword.value === userConfirmPassword.value)) {
      inputForm.confirmPassword.isValid = true;
      userConfirmPassword.classList.add('green');
    } else inputForm.confirmPassword.isValid = false;
    checkFormValid();
  }

  const checkFormValid = () => {
    const isFormValid = Object.values(inputForm).every( value => value.isValid);
    isFormValid ? submitBtnUp.removeAttribute('disabled') : submitBtnUp.setAttribute('disabled', true);
  }

  signUpForm.addEventListener('submit', event => {
    event.preventDefault();

    const email = userEmail.value;
    const password = userPassword.value;

    signUp(email, password)
      .then( response => {

        if (response) {
          signIn(email, password).then(response => {
            if (response) {
              const { idToken: token } = response.data;
              setToken(token);
              setUserEmail(email);
              const redirect = () =>  window.location.href = routes.home;
              setTimeout(redirect, 3000);
            }
          });
        }
      });
  });
}

export const showMessageBoardUp = () => {
  const usernameTip = document.getElementById('usernameTip');
  const emailTip = document.getElementById('emailTip');
  const passwordTip = document.getElementById('passwordTip');
  const confirmPasswordTip = document.getElementById('confirmPasswordTip');

  usernameTip.onclick = () => {
    console.log('usernameTip');
    messageText.innerText = INFO_MESSAGE.username;
    messageBlock.style.display = 'block';
    const block = () => messageBlock.style.display = 'none';
    setTimeout(block, 3000)
  }

  emailTip.onclick = () => {
    console.log('emailTip');
    messageText.innerText = INFO_MESSAGE.email;
    messageBlock.style.display = 'block';
    const block = () => messageBlock.style.display = 'none';
    setTimeout(block, 3000)
  }

  passwordTip.onclick = () => {
    console.log('passwordTip');
    messageText.innerText = INFO_MESSAGE.password;
    messageBlock.style.display = 'block';
    const block = () => messageBlock.style.display = 'none';
    setTimeout(block, 3000)
  }

  confirmPasswordTip.onclick = () => {
    console.log('confirmPasswordTip');
    messageText.innerText = INFO_MESSAGE.confirmPassword;
    messageBlock.style.display = 'block';
    const block = () => messageBlock.style.display = 'none';
    setTimeout(block, 3000);
  }
}
