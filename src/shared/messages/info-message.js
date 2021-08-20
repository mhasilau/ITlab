export const INFO_MESSAGE = {
  username: 'Enter Your Name using Latin alphabet, numbers, and "_" (Max. 29)',
  email: 'Enter your email in the following format: name@domain.xx',
  password: 'Create a Password using:\n ·Latin alphabet\n ·Min 8 and Max 29 characters\n ·Symbol "_" (at least 1)\n ·At least 1 character in Uppercase\n ·At least 1 character in lowercase',
  confirmPassword: 'Enter created password one more time',
  passwordIn: 'Enter your password',
  emailIn: 'Use the email address you specified during registration'
}

export const userInfoNotification = (birth, linkedin, github) => {
  const board = document.querySelector('.info-message')
  const birthOut = document.querySelector('.show-info-birth')
  const linkedinOut = document.querySelector('.show-info-linkedin')
  const githubOut = document.querySelector('.show-info-github')
  const block = () => board.style.display = 'none';
  board.style.display = 'block';
  birthOut.innerText = birth;
  linkedinOut.innerText = linkedin
  birthOut.href = `${linkedin}`;
  console.log(birthOut.href);
  githubOut.innerText = github
  birthOut.href = `${github}`;

  setTimeout(block, 5000)
}
