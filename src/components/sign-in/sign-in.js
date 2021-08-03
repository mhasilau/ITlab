require('firebase/auth');

import { signIn } from '../../api/api-handlers';
import { routes } from '../../shared/constants/routes';
import { localStorageFunc } from '../../shared/local-storage/ls-config';
import { INFO_MESSAGE } from '../../shared/messages/info-message';
import { passwordPower, nameValidator, emailValidator } from '../../shared/validators';


const messageBlock = document.querySelector('.info-message');
const messageText = document.querySelector('.show-info-message');
const helpMessageEmail = document.getElementById('emailError');
const helpMessagePassword = document.getElementById('passwordError');

export const showHidePasswordIn = () => {
  const password = document.querySelector('.textPassword');
  const userPassword = document.getElementById('password');

  password.onclick = () => userPassword.type === 'password' ?
    userPassword.type = 'text' :
    userPassword.type = 'password'
}

export const signInHandler = () => {
  const signInForm = document.querySelector('.main_content_form');
  const signInEmailInput = document.getElementById('email');
  const signInPasswordInput = document.getElementById('password');
  const signInBtn = document.getElementById('submitBtn');

  helpMessageEmail.style.display = 'none';
  helpMessagePassword.style.display = 'none';

  helpMessageEmail.innerText = 'Incorrect e-mail. Click help';
  helpMessagePassword.innerText = 'Please, enter correct password.';

  signInEmailInput.oninput = () => {
    if (emailValidator(signInEmailInput.value)) {
      signInEmailInput.classList.add('green');
      helpMessageEmail.style.display = 'none';
    } else {
      signInEmailInput.classList.add('red');
      helpMessageEmail.style.display = 'block';
    }
  }

  signInForm.addEventListener('submit', event => {
    event.preventDefault();
    const email = signInEmailInput.value;
    const password = signInPasswordInput.value;
    signIn(email, password).then(response => {
      if (response) {
        const { idToken: token } = response.data;
        localStorageFunc.setToken(token);
        // There is will be message 'Hello, username'
        setTimeout( () =>  window.location.href = routes.home, 3000);
      }
    });
  });
}

export const showMessageBoardIn = () => {
  const emailTip = document.getElementById('emailTip');
  const passwordTip = document.getElementById('passwordTip');

  const message = () => {
    messageBlock.style.display = 'block';
    setTimeout( () => messageBlock.style.display = 'none', 3000)
  }

  emailTip.onclick = () => {
    messageText.innerText = INFO_MESSAGE.emailIn;
    message();
  }

  passwordTip.onclick = () => {
    messageText.innerText = INFO_MESSAGE.passwordIn;
    message();
  }
}
