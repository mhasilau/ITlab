export const userNameValid = /^(([a-z0-9_]+\s)*[a-z0-9]){4,29}$/i;
export const userEmailValid = /^[a-zа-я0-9(.\-+_)?]+@[a-zа-я0-9\-+]+\.[a-zа-я]{2,6}$/i;
export const userPasswordLengthValid = /^(?<!\\s+)[\S]{6,29}$/;
export const userPasswordCaseValid = /(?=.*[a-z])/i;
export const userPasswordNumbersValid = /(?=.*[0-9])/;
export const userLinkedInValid = /^(https?:\/\/(www.)?linkedin.com\/)[a-z0-9.\-\/_+]{11,}$/gi;
export const userGitValid = /^(https?:\/\/(www.)?github.com\/)[a-z0-9.\-\/_+]{6,}$/gi;
