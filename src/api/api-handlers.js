require('firebase/app');

import firebase from 'firebase/app';
import axios from 'axios';

import { FIREBASE_CONFIG, databaseURL, authURL } from './api-config';
import { showErrorNotification } from '../shared/error-handlers';
import { localStorageFunc } from '../shared/local-storage/ls-config';
import { routes } from '../shared/constants/routes';

export const initApi = () => {
  firebase.initializeApp(FIREBASE_CONFIG);
}

export const signIn = (email, password) => {
  return axios.post(authURL, {
    email,
    password,
    returnSecureToken: true
  })
    .then(response => {
      if (response) {
        const { idToken: token, localId } = response.data;
        localStorageFunc.setToken(token);
        localStorageFunc.setUID(localId);
        getUser().then( () => window.location.href = routes.home);
      }
    });
}

export const getUser = () => {
  return axios.get(`${databaseURL}/users.json`)
    .then( response => {
      if (response) {
        const transformedUsers = Object.keys(response.data).map( key => ({...response.data[key], id: key}));
        const user = transformedUsers.find( user => user.uuid === localStorageFunc.getUID());
        localStorageFunc.setUserData(user);
      }
    })
}

export const signUp = async user => {
  const { password, email } = user;

  try {
    await createAuthData(email, password);
    await createUser(user).then( response => localStorageFunc.setUserId(response.data.name));
    await signIn(email, password);
  } catch (error) {
    showErrorNotification(error);
  }
}

export const createAuthData = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then( response => {
      const { uid } = response.user;
      localStorageFunc.setUID(uid);
    })
}

export const createPost = post => {
  const { userId, username, date, content } = post;
  return fetch(`${databaseURL}/posts.json`,
  {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          userId,
          username,
          date,
          content
      })
  });
}

export const getPosts = () => {
  return fetch(`${databaseURL}/posts.json`,
  {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
  })
  .then( response => response.json())
  .then( result => {
      const gettingKeysFromObj = Object.keys(result).map( key => ({
          ...result[key],
          id: key
      }));
      return gettingKeysFromObj;
  });
}

export const createUser =  user  => {
  const { username, email } = user;

  return axios.post(`${databaseURL}/users.json`, {
    username,
    email,
    uuid: localStorageFunc.getUID()
  });
}

export const getUsers = () => {
  return axios.get(`${databaseURL}/users.json`)
    .then( response => {
      if (response) {
        return Object.keys(response.data).map( key => ({...response.data[key], id: key}));
      }
    });
}

initApi();
