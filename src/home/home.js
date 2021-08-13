import moment from 'moment';
import axios from 'axios';

import { LocalStorageClass } from '../shared/local-storage/ls-config';
import { createPost, getPosts, getUsers, loadPhoto, updAvatar, updUser } from '../api/api-handlers';
import { routes } from '../shared/constants/routes';
import { databaseURL, noAvatarURL } from '../api/api-config';
import { showErrorNotification } from '../shared/error-handlers';
import { lists } from './countryList';

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

  updAvatar();

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
  const {username, country, birth, linkedin, github, id, uuid, ava } = LocalStorageClass.getUserData();

  const change_info = document.getElementById('change-info');
  const save_info = document.getElementById('save-info');
  const usernameInp = document.getElementById('username');
  const countryInp = document.getElementById('country');
  const birthInp = document.getElementById('birth');
  const linkedinInp = document.getElementById('linkedin');
  const githubInp = document.getElementById('github');
  const avatar = document.getElementById('file');
  const deleteAvatar = document.getElementById('delAvatar');


  // countryInp.onclick = () => lists();


  usernameInp.value = username;
  countryInp.value = country;
  birthInp.value = birth;
  linkedinInp.value = linkedin;
  githubInp.value = github;

  save_info.style.display = 'none';
  
  usernameInp.setAttribute('disabled', true);
  countryInp.setAttribute('disabled', true);
  birthInp.setAttribute('disabled', true);
  linkedinInp.setAttribute('disabled', true);
  githubInp.setAttribute('disabled', true);

  if (LocalStorageClass.getUserData().ava != noAvatarURL) {
    deleteAvatar.style.display = 'block';
  } else deleteAvatar.style.display = 'none';

  change_info.onclick = () => {
    const userUpd = {
      username: usernameInp.value,
      country: countryInp.value,
      birth: birthInp.value,
      linkedin: linkedinInp.value,
      github: githubInp.value,
      id: id,
      uuid: uuid,
      ava: ava
    }

    save_info.style.display = 'block';
    change_info.style.display = 'none';
    
    lists();

    usernameInp.removeAttribute('disabled');
    countryInp.removeAttribute('disabled');
    birthInp.removeAttribute('disabled');
    linkedinInp.removeAttribute('disabled');
    githubInp.removeAttribute('disabled');

    const saveInfo = async (user) => {
      await axios.put(`${databaseURL}/users/${user.id}.json`, user)
      .then(() => LocalStorageClass.setUserData(user))
      .catch( error => showErrorNotification(error));
    }

    save_info.onclick = () => {
      saveInfo(userUpd)
        .then( () => {
          save_info.style.display = 'none';
          change_info.style.display = 'block';
          usernameInp.setAttribute('disabled', true);
          countryInp.setAttribute('disabled', true);
          birthInp.setAttribute('disabled', true);
          linkedinInp.setAttribute('disabled', true);
          githubInp.setAttribute('disabled', true);
        });
    }
  }

  avatar.oninput = async event => {
      const avaName = document.getElementById('file').value;
      await loadPhoto(event, avaName);
      updAvatar();
      deleteAvatar.style.display = 'block';
  }

  deleteAvatar.onclick = async () => {
    const {username, country, birth, linkedin, github, id, uuid } = LocalStorageClass.getUserData();
    const noAvaUser = {
      username,
      country,
      birth,
      linkedin,
      github,
      id,
      uuid,
      ava: noAvatarURL
    }

    deleteAvatar.style.display = 'none';

    await updUser(noAvaUser);
    await updAvatar();
  }
}
