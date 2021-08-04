import moment from 'moment';

import { LocalStorageClass } from '../shared/local-storage/ls-config';
import { createPost, getPosts, getUsers } from '../api/api-handlers';
import { routes } from '../shared/constants/routes';


export const postForm = () => {
  const post_form = document.getElementById('post-form');
  const post_content = document.getElementById('post-content');

  const post = {
    userId: LocalStorageClass.getUserData().id,
    username: LocalStorageClass.getUserData().username,
    date: moment().format(),
    content: post_content
  }

  post_form.addEventListener('submit', event => {
    event.preventDefault();
    post.content = post_content.value;
    createPost(post)
    post_content.value = null;
    window.location.reload();
  });
}

export const logout = () => {
  const logoutBtn = document.getElementById('logout-btn');
  logoutBtn.onclick = () => {
    LocalStorageClass.removeAll();
    window.location.href = routes.sign_in;
  }
}

export const renderPosts = async () => {
  const postsBlock = document.querySelector('.renger-posts');
  let users;
  let posts;

  postsBlock.innerHTML = null;

  await getPosts().then( response => posts = response );
  await getUsers().then( response => users = response );

  posts.forEach( post => {
    const user = users.find(user => user.id === post.userId);
    const postPlace = document.createElement('div');
    const content = document.createElement('p');
    const infoName = document.createElement('span');
    const infoDate = document.createElement('span');

    postPlace.className = 'renger-posts-post';
    content.className = 'renger-posts-content';
    infoName.className = 'renger-posts-info';
    infoDate.className = 'renger-posts-info';

    if (user.uuid !== LocalStorageClass.getUID()) {
      postPlace.style.display = 'none';
    }

    content.innerHTML = post.content;
    infoName.innerHTML = `${post.username}, `;
    infoDate.innerHTML = moment(post.date).format('MMM Do YY');

    postsBlock.prepend(postPlace);
    postPlace.append(content, infoName, infoDate);

  });
}
