export const INFO_MESSAGE = {
  username: 'Enter Your Name using Latin alphabet and numbers (Max. 29)',
  email: 'Enter your email in the following format: name@domain.xxx',
  password: 'Create a Password using:\n ·Latin alphabet\n ·Min 8 and Max 29 characters\n ·Symbol "_" (at least 1)\n and numbers',
  confirmPassword: 'Enter created password one more time',
  passwordIn: 'Enter your password',
  emailIn: 'Use the email address you specified during registration'
}

export const userInfoNotification = (birth, linkedin, github, ava, country) => {
  const board = document.querySelector('.info-message-user');
  const birthOut = document.querySelector('.show-info-birth');
  const countryOut = document.querySelector('.show-info-country');
  const linkedinOut = document.querySelector('.show-info-linkedin');
  const githubOut = document.querySelector('.show-info-github');
  const closeBtn = document.getElementById('close-info');
  const otherAva = document.querySelector('.info-message-user-avatar');

  closeBtn.style.cursor = 'pointer';
  board.style.display = 'block';
  birthOut.innerText = birth;
  countryOut.innerText = country;
  linkedinOut.innerText = linkedin
  linkedinOut.href = `${linkedin}`;
  githubOut.innerText = github
  githubOut.href = `${github}`;
  otherAva.style.backgroundImage = `url(${ava})`
  console.log(otherAva);

  closeBtn.onclick = () => board.style.display = 'none'
}
