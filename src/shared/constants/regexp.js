export const userNameValid = /\w{4,29}/i;

export const userEmailValid = /^[a-z0-9.\-+_]+@[a-z0-9.\-+_]+\.[a-z]{2.6}$/;

export const userPasswordLengthValid = /^.{8,}$/;
export const userPasswordLowerCaseValid = /(?=.*[a-z])/;
export const userPasswordUpperCaseValid = /(?=.*[A-Z])/;
export const userPasswordNumbersValid = /(?=.*\d)/i;
export const userPasswordMinSymbolsValid = /[a-z\d@$#!%&?^*()-+_,.<>/\\]{8,}/;
