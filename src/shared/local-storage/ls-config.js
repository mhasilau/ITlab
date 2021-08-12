export class LocalStorageClass {
  static getToken() {
    return localStorage.getItem('token');
  }

  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static getUserData() {
    return JSON.parse(localStorage.getItem('userData'));
  }

  static setUserData(user) {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  static removeAll() {
    localStorage.clear();
  }

  static getUID() {
    return localStorage.getItem('uid');
  }

  static setUID(id) {
    localStorage.setItem('uid', id);
  }

  static getUserId() {
    return localStorage.getItem('userId');
  }

  static setUserId(id) {
    localStorage.setItem('userId', id);
  }

  static deleteAvatar() {
    localStorage.removeItem('userData');
  }
}
