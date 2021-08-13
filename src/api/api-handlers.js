require('firebase/app');

import firebase from 'firebase/app';
import 'firebase/storage';
import axios from 'axios';

import { FIREBASE_CONFIG, databaseURL, authURL, noAvatarURL } from './api-config';
import { showErrorNotification } from '../shared/error-handlers';
import { LocalStorageClass } from '../shared/local-storage/ls-config';
import { routes } from '../shared/constants/routes';
import { awaiting, stopAwaiting } from '../shared/awaiting-load';

export const initApi = () => {
  firebase.initializeApp(FIREBASE_CONFIG);
}

export const signIn = (email, password) => {
  awaiting();

  return axios.post(authURL, {
    email,
    password,
    returnSecureToken: true
  })
    .then(response => {
      if (response) {
        const { idToken: token, localId } = response.data;
        LocalStorageClass.setToken(token);
        LocalStorageClass.setUID(localId);
        getUser().then( () => {
          stopAwaiting();
          window.location.href = routes.home;
        } );
      }
    })
    .catch (error => showErrorNotification(error));
}

export const getUser = () => {
  return axios.get(`${databaseURL}/users.json`)
    .then( response => {
      if (response) {
        const transformedUsers = Object.keys(response.data).map( key => ({...response.data[key], id: key}));
        const user = transformedUsers.find( user => user.uuid === LocalStorageClass.getUID());
        LocalStorageClass.setUserData(user);
      }
    })
}

export const signUp = async user => {
  const { password, email } = user;

  try {
    await awaiting();
    await createAuthData(email, password);
    await createUser(user).then( response => LocalStorageClass.setUserId(response.data.name));
    await createUser(user).then( response => console.log(response));

    await signIn(email, password);
    stopAwaiting();
  } catch (error) {
    stopAwaiting();
    showErrorNotification(error);
  }
}

export const createAuthData = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then( response => {
      const { uid } = response.user;
      LocalStorageClass.setUID(uid);
    })
}

export const createPost = post => {
  const { userId, username, date, content } = post;

  awaiting();
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
  })
  .then( () => stopAwaiting())
  .catch( error => {
    stopAwaiting();
    showErrorNotification(error);
  });
}

export const getPosts = () => {
  awaiting();
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
      stopAwaiting();
      return gettingKeysFromObj;
  })
  .catch( error => {
    stopAwaiting();
    showErrorNotification(error);
  });
}

export const createUser =  user  => {
  const { username, email, country, birth, linkedin, github } = user;
  awaiting();

  return axios.post(`${databaseURL}/users.json`, {
    username,
    email,
    uuid: LocalStorageClass.getUID(),
    country,
    birth,
    linkedin,
    github,
    ava: `${noAvatarURL}`
  })
  .catch( error => {
    stopAwaiting();
    showErrorNotification(error);
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

export const loadPhoto = async (event, avaName) => {
  const user = LocalStorageClass.getUserData();
  awaiting();

  await firebase
    .storage()
    .ref(`img/${avaName}`)
    .put(event.target.files[0])
    .catch( error => {
      stopAwaiting();
      showErrorNotification(error);
    });

  await firebase
    .storage()
    .ref(`img/${avaName}`)
    .getDownloadURL()
    .then( url => user.ava = url )
    .catch( error => {
      stopAwaiting();
      showErrorNotification(error);
    });

  await updUser(user)
  .then( () => updAvatar())
  .catch( error => {
    stopAwaiting();
    showErrorNotification(error);
  });

  setTimeout(() => {
    stopAwaiting();
  }, 1000);
}

export const updUser = async (user) => {
  return axios.put(`${databaseURL}/users/${user.id}.json`, user)
  .then( () => LocalStorageClass.setUserData(user));
}

export const updAvatar = () => {
  const userAvatar = document.querySelector('.main-content-user-photo');
  userAvatar.style.backgroundImage = `url('${LocalStorageClass.getUserData().ava}')`;
}

initApi();
