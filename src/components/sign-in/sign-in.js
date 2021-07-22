
require('firebase/auth');

import firebase from 'firebase/app';


import { signIn } from '../../api/api-handlers';
import { routes } from '../../shared/constants/routes';
import { setToken } from '../../shared/local-storage/ls-config';

export const showHidePasswordIn = () => {
  const password = document.querySelector('.textPassword');
  const userPassword = document.getElementById('password');

  password.onclick = () => {
    if (userPassword.type == 'password') {
      userPassword.type = 'text';
    } else userPassword.type = 'password';
  }
}

export const signInHandler = () => {
  const signInForm = document.querySelector('.main_content_form');
  const signInEmailInput = document.getElementById('email');
  const signInPasswordInput = document.getElementById('password');
  const signInBtn = document.getElementById('subminBtn');

  signInForm.addEventListener('submit', event => {
    event.preventDefault();
    const email = signInEmailInput.value;
    const password = signInPasswordInput.value;
    signIn(email, password).then(response => {
      if (response) {
        const { idToken: token } = response.data;
        setToken(token);
        console.log('hello');
        const redirect = () =>  window.location.href = routes.home;
        setTimeout(redirect, 3000);
      }
    });
  });
}