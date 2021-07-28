import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { getUserEmail, removeToken, removeUserEmail } from '../shared/local-storage/ls-config';
import { createPost, getPosts } from '../api/api-handlers';
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

export const renderPosts = () => {
  getPosts()
    .then( posts => {
      const postsBlock = document.querySelector('.renger-posts');
      postsBlock.innerHTML = null;
      posts.forEach( item => {

        const post = document.createElement('div');
        const content = document.createElement('p');
        const infoName = document.createElement('span');
        const infoDate = document.createElement('span');

        post.className = 'renger-posts-post';
        content.className = 'renger-posts-content';
        infoName.className = 'renger-posts-info';
        infoDate.className = 'renger-posts-info';

        content.innerHTML = item.content;
        infoName.innerHTML = `${item.email}, `;
        infoDate.innerHTML = moment(item.date).format('MMM Do YY');

        postsBlock.append(post);
        post.append(content, infoName, infoDate);
      })
  });
}
