export const userNameValid = /^[a-z0-9]{4,29}$/i;

export const userEmailValid = /^[a-zа-я0-9.\-_+]+@[a-zа-я0-9\-_+]+\.[a-zа-я]{2,6}$/i;

export const userPasswordLengthValid = /^.{6,29}$/;
export const userPasswordRussian = /(?=.*[а-яё])/i;
export const userPasswordLowerCaseValid = /(?=.*[a-z])/i;
export const userPasswordNumbersValid = /(?=.*[0-9])/;
