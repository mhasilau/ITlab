import moment from 'moment';
import axios from 'axios';

import { LocalStorageClass } from '../shared/local-storage/ls-config';
import { createPost, getPosts, getUsers } from '../api/api-handlers';
import { routes } from '../shared/constants/routes';
import { databaseURL } from '../api/api-config';
import { showErrorNotification } from '../shared/error-handlers';


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
    renderPosts();
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

    const deletePost = async (id) => {
      await axios.delete(`${databaseURL}/posts/${id}.json`);
      postPlace.remove();
      renderPosts();
    }

    deleteBnt.onclick = () => deletePost(post.id);

    const editPost = (post) => {
      content.style.display = 'none';
      editContent.style.display = 'block';
      saveBtn.style.display = 'block';
      editContent.innerText = post.content;
    }

    saveBtn.onclick = () => savePost(post);

    const savePost =  (post) => {
      content.style.display = 'block';
      editContent.style.display = 'none';
      saveBtn.style.display = 'none';
      post.content = editContent.value;
      axios.put(`${databaseURL}/posts/${post.id}.json`, post)
        .then( () => renderPosts())
        .catch( error => showErrorNotification(error));
    }

    editBnt.onclick = () => editPost(post);

    content.innerHTML = post.content;
    infoName.innerHTML = `${post.username},  `;
    infoDate.innerHTML = moment(post.date).format('MMM Do YY');

    postsBlock.prepend(postPlace);
    functionalBlock.append(saveBtn, editBnt, deleteBnt);
    postPlace.append( functionalBlock, editContent, content, infoName, infoDate);
  });
}

export const changeUserData = () => {
  const {username, country, birth, linkedin, github, id, uuid } = LocalStorageClass.getUserData();

  const change_info = document.getElementById('change-info');
  const save_info = document.getElementById('save-info');
  const usernameInp = document.getElementById('username');
  const countryInp = document.getElementById('country');
  const birthInp = document.getElementById('birth');
  const linledinInp = document.getElementById('linledin');
  const githubInp = document.getElementById('github');

  usernameInp.value = username;
  countryInp.value = country;
  birthInp.value = birth;
  linledinInp.value = linkedin;
  githubInp.value = github;

  save_info.style.display = 'none';
  usernameInp.setAttribute('disabled', true);
  countryInp.setAttribute('disabled', true);
  birthInp.setAttribute('disabled', true);
  linledinInp.setAttribute('disabled', true);
  githubInp.setAttribute('disabled', true);

  change_info.onclick = () => {
    save_info.style.display = 'block';
    change_info.style.display = 'none';


    usernameInp.removeAttribute('disabled');
    countryInp.removeAttribute('disabled');
    birthInp.removeAttribute('disabled');
    linledinInp.removeAttribute('disabled');
    githubInp.removeAttribute('disabled');

    const userUpd = {
      username: usernameInp.value,
      country: countryInp.value,
      birth: birthInp.value,
      linkedin: linledinInp.value,
      github: githubInp.value,
      id: id,
      uuid: uuid
    }

    const saveInfo = async (user) => {
      await axios.put(`${databaseURL}/users/${user.id}.json`, user)
      .then(() => {
        LocalStorageClass.setUserData(user);
      })
      .catch( error => showErrorNotification(error));
    }

    save_info.onclick = async () => {
      await saveInfo(userUpd)
        .then( () => {
          save_info.style.display = 'none';
          change_info.style.display = 'block';
          usernameInp.setAttribute('disabled', true);
          countryInp.setAttribute('disabled', true);
          birthInp.setAttribute('disabled', true);
          linledinInp.setAttribute('disabled', true);
          githubInp.setAttribute('disabled', true);
        });

    }
  }
}
