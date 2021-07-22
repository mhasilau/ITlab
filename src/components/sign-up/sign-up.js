import { signUp } from "../../api/api-handlers";
import { setUserEmail } from "../../shared/local-storage/ls-config";
import { INFO_MESSAGE } from '../../shared/messages/info-message';
import { passwordPower } from '../../shared/validators';

const messageBlock = document.querySelector('.info-message');
const messageText = document.querySelector('.show-info-message');

const signUpForm = document.querySelector('.main_content_form');
const userNickname = document.getElementById('username');
const userEmail = document.getElementById('email');
const userPassword = document.getElementById('password');
const userConfirmPassword = document.getElementById('confirmPassword');



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



  signUpForm.addEventListener('submit', event => {
    event.preventDefault();

    const email = userEmail.value;
    const password = userPassword.value;
    signUp(email, password)
      .then( response => {
        if (response) {
          const { email } = response.user;
          setUserEmail(email);
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
    setTimeout(block, 3000)
  }
}
