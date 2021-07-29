require('firebase/auth');

import { signIn } from '../../api/api-handlers';
import { routes } from '../../shared/constants/routes';
import { setToken, setUserEmail } from '../../shared/local-storage/ls-config';
import { INFO_MESSAGE } from '../../shared/messages/info-message';

const messageBlock = document.querySelector('.info-message');
const messageText = document.querySelector('.show-info-message');

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

  signInForm.addEventListener('submit', event => {
    event.preventDefault();
    const email = signInEmailInput.value;
    const password = signInPasswordInput.value;
    signIn(email, password).then(response => {
      if (response) {
        const { idToken: token } = response.data;
        setToken(token);
        setUserEmail(email);
        // There is will be message 'Hello, username'
        const redirect = () =>  window.location.href = routes.home;
        setTimeout(redirect, 3000);
      }
    });
  });
}

export const showMessageBoardIn = () => {
  const emailTip = document.getElementById('emailTip');
  const passwordTip = document.getElementById('passwordTip');

  emailTip.onclick = () => {
    messageText.innerText = INFO_MESSAGE.emailIn;
    messageBlock.style.display = 'block';
    const block = () => messageBlock.style.display = 'none';
    setTimeout(block, 3000)
  }

  passwordTip.onclick = () => {
    messageText.innerText = INFO_MESSAGE.passwordIn;
    messageBlock.style.display = 'block';
    const block = () => messageBlock.style.display = 'none';
    setTimeout(block, 3000)
  }
}
