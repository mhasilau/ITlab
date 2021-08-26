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

  static getUsername() {
    return localStorage.getItem('username');
  }

  static setUsername(username) {
    localStorage.setItem('username', username);
  }

  static getCountry() {
    return localStorage.getItem('country');
  }

  static setCountry(country) {
    localStorage.setItem('country', country);
  }

  static getBirth() {
    return localStorage.getItem('birth');
  }

  static setBirth(birth) {
    localStorage.setItem('birth', birth);
  }

  static getLinkedIn() {
    return localStorage.getItem('linkedin');
  }

  static setLinkedIn(linkedin) {
    localStorage.setItem('linkedin', linkedin);
  }

  static getGithub() {
    return localStorage.getItem('github');
  }

  static setGithub(github) {
    localStorage.setItem('github', github);
  }
}
