import moment from 'moment';
import axios from 'axios';

import { LocalStorageClass } from '../shared/local-storage/ls-config';
import { createPost, getPosts, getUsers } from '../api/api-handlers';
import { routes } from '../shared/constants/routes';
import { databaseURL } from '../api/api-config';


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
    createPost(post);
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
  const postsBlock = document.querySelector('.render-posts');
  let users;
  let posts;

  postsBlock.innerHTML = null;

  await getPosts().then( response => posts = response );
  await getUsers().then( response => users = response );

  posts.forEach( post => {
    const user = users.find(user => user.id === post.userId);
    const functionalBlock = document.createElement('div');
    const editBnt = document.createElement('button');
    const deleteBnt = document.createElement('button');
    const saveBtn = document.createElement('button');
    const postPlace = document.createElement('div');
    const content = document.createElement('p');
    const editContent = document.createElement('textarea');
    const infoName = document.createElement('span');
    const infoDate = document.createElement('span');

    functionalBlock.className = 'functional-block';
    editBnt.className = 'edit';
    deleteBnt.className = 'delete';
    saveBtn.className = 'save';
    postPlace.className = 'render-posts-post';
    content.className = 'render-posts-content';
    infoName.className = 'render-posts-info';
    infoDate.className = 'render-posts-info';
    editContent.style.display = 'none';
    saveBtn.style.display = 'none';

    if (user.uuid !== LocalStorageClass.getUID()) {
      postPlace.style.display = 'none';
    }

    const detelePost = (id) => {
      postPlace.remove();
      axios.delete(`${databaseURL}/posts/${id}.json`)
        .then(window.location.reload());
    }

    deleteBnt.onclick = () => {
      detelePost(post.id);
    }

    const editPost = (post) => {
      content.style.display = 'none';
      editContent.style.display = 'block';
      saveBtn.style.display = 'block';
      editContent.innerText = post.content;
    }

    saveBtn.onclick = () => {
      savePost(post);
    }

    const savePost = (post) => {
      content.style.display = 'block';
      editContent.style.display = 'none';
      saveBtn.style.display = 'none';
      console.log(post);
      post.content = editContent.value;
      axios.put(`${databaseURL}/posts/${post.id}.json`, post)
        .then(window.location.reload());
    }

    editBnt.onclick = () => {
      editPost(post);
    }

    content.innerHTML = post.content;
    infoName.innerHTML = `${post.username},  `;
    infoDate.innerHTML = moment(post.date).format('MMM Do YY');

    postsBlock.prepend(postPlace);
    functionalBlock.append(saveBtn, editBnt, deleteBnt);
    postPlace.append( functionalBlock, editContent, content, infoName, infoDate);
  });
}
