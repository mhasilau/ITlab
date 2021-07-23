export const userNameValid = /^[a-zA-Z]{4,29}$/i;

export const userEmailValid = /^[a-z0-9.\-_+]+@[a-z0-9\-_+]+\.[a-z0-9.\-_+]{2,6}$/i;

export const userPasswordLengthValid = /^.{8,}$/;
export const userPasswordLowerCaseValid = /(?=.*[a-z])/;
export const userPasswordUpperCaseValid = /(?=.*[A-Z])/;
export const userPasswordNumbersValid = /(?=.*[0-9])/;
export const userPasswordMinSymbolsValid = /[@$#!%&?^*()-+_,.<>/\\]/;
