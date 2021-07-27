import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { getUserEmail, removeToken, removeUserEmail } from '../shared/local-storage/ls-config';
import { createPost } from '../api/api-handlers';
import { routes } from '../shared/constants/routes';


export const postForm = () => {
  const post_form = document.getElementById('post-form');
  const post_content = document.getElementById('post-content');

  const post = {
    userId: uuidv4(),
    email: getUserEmail(),
    date: moment().format(),
    content: post_content
  }

  post_form.addEventListener('submit', event => {
    event.preventDefault();
    post.content = post_content.value;
    createPost(post)
    .then( () => console.log('lol')); //not yet render function
    post_content.value = null;
  });
}

export const logout = () => {
  const logoutBtn = document.getElementById('logout-btn');
  logoutBtn.onclick = () => {
    removeToken();
    removeUserEmail();
    window.location.href = routes.sign_in;
  }
}