export const getToken = () => localStorage.getItem('token');

export const setToken = token => localStorage.setItem('token', token);

export const removeToken = () => localStorage.removeItem('token');

export const getUserEmail = () => localStorage.getItem('userEmail');

export const setUserEmail = email => localStorage.setItem('userEmail', email);

export const removeUserEmail = () => localStorage.removeItem('userEmail');

export const removeAll = () => localStorage.clear();

export const getUserName = () => localStorage.getItem('userName');

export const setUserName = name => localStorage.setItem('userName', name);

export const removeUserName = () => localStorage.removeItem('userName');

export const getUID = () => localStorage.getItem('uid');

export const setUID = id => localStorage.setItem('uid', id);

export const removeUID = () => localStorage.removeItem('uid');
