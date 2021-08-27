import moment from 'moment';
import axios from 'axios';

import { LocalStorageClass } from '../shared/local-storage/ls-config';
import { 
  createPost,
  getPosts,
  getUsers,
  loadPhoto,
  updAvatar,
  updUser,
  saveInfo,
  deleteUserDataLS
} from '../api/api-handlers';
import { routes } from '../shared/constants/routes';
import { databaseURL, noAvatarURL } from '../api/api-config';
import { showErrorNotification, errorNotification } from '../shared/error-handlers';
import { lists } from './countryList';
import { ERROR_MESSAGE } from '../shared/messages/error-messages';
import { CONSTANTS } from '../shared/constants/constants';
import { nameValidator, linkLinkedinValidator, linkGitValidator } from '../shared/validators';

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
    const content = document.createElement('textarea');
    const editContent = document.createElement('textarea');
    const infoName = document.createElement('span');
    const infoDate = document.createElement('span');

    functionalBlock.className = 'functional-block';
    editBnt.className = 'edit';
    deleteBnt.className = 'delete';
    saveBtn.className = 'save';
    postPlace.className = 'render-posts-post';
    content.className = 'render-posts-content';
    content.readOnly = true;
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
    infoName.innerHTML = `${user.username},  `;
    infoDate.innerHTML = moment(post.date).format('lll');

    postsBlock.prepend(postPlace);
    functionalBlock.append(saveBtn, editBnt, deleteBnt);
    postPlace.append( functionalBlock, editContent, content, infoName, infoDate);
  });
}

export const changeUserData = () => {
  const {username, country, birth, linkedin, github, id, uuid, ava } = LocalStorageClass.getUserData();

  const change_info = document.getElementById('change-info');
  const save_info = document.getElementById('save-info');
  const discard_info = document.getElementById('discard-info');
  const usernameInp = document.getElementById('username');
  const countryInp = document.getElementById('country');
  const birthInp = document.getElementById('birth');
  const linkedinInp = document.getElementById('linkedin');
  const githubInp = document.getElementById('github');
  const avatar = document.getElementById('file');
  const deleteAvatar = document.getElementById('delAvatar');
  const userInfoBlock = document.querySelector('.user-info');
  const helpMessageUser = document.getElementById('usernameError');
  const helpMessageBirth = document.getElementById('birthError');
  const helpMessageLinkedin = document.getElementById('linkedinError');
  const helpMessageGithub = document.getElementById('githubError');

  helpMessageUser.style.display = 'none';
  helpMessageBirth.style.display = 'none';
  helpMessageLinkedin.style.display = 'none';
  helpMessageGithub.style.display = 'none';
  discard_info.style.display = 'none';
  save_info.style.display = 'none';

  helpMessageUser.innerText = `${ERROR_MESSAGE.helpMessageUser}`;
  helpMessageBirth.innerText = `${ERROR_MESSAGE.helpMessageBirth}`;
  helpMessageLinkedin.innerText = `${ERROR_MESSAGE.helpMessageLink}`;
  helpMessageGithub.innerText = `${ERROR_MESSAGE.helpMessageLink}`;

  console.log();

  usernameInp.oninput = () => {
    LocalStorageClass.setUsername(usernameInp.value);
    nameValidator(usernameInp.value) ? helpMessageUser.style.display = 'none' : helpMessageUser.style.display = 'block';
  }

  birthInp.oninput = () => {
    const year = moment().format();
    const birthYear = Number(birthInp.value.split('-')[0]);
    const birthMonth = Number(birthInp.value.split('-')[1]);
    const birthDay = Number(birthInp.value.split('-')[2]);
    const todayYear = Number(year.split('-')[0]);
    const todayMonth = Number(year.split('-')[1]);
    const todayDay = Number(Date().split(' ')[2]);

    LocalStorageClass.setBirth(birthInp.value);

    if (birthYear < todayYear && birthYear > CONSTANTS.minYear) {
      helpMessageBirth.style.display = 'none';
    } else if (birthYear == todayYear && birthYear > CONSTANTS.minYear && birthMonth < todayMonth) {
      helpMessageBirth.style.display = 'none';
    } else if (birthYear == todayYear && birthYear > CONSTANTS.minYear && birthMonth == todayMonth && birthDay <= todayDay) {
      helpMessageBirth.style.display = 'none';
    } else helpMessageBirth.style.display = 'block';
  }

  linkedinInp.oninput = () => {
    LocalStorageClass.setLinkedIn(linkedinInp.value);
    linkLinkedinValidator(linkedinInp.value) ?
      helpMessageLinkedin.style.display = 'none' :
      helpMessageLinkedin.style.display = 'block';
  }

  githubInp.oninput = () => {
    LocalStorageClass.setGithub(githubInp.value);
    linkGitValidator(githubInp.value) ?
      helpMessageGithub.style.display = 'none' :
      helpMessageGithub.style.display = 'block';
  }

  LocalStorageClass.getUsername() ? usernameInp.value = LocalStorageClass.getUsername() : usernameInp.value = LocalStorageClass.getUserData().username;
  LocalStorageClass.getBirth() ? birthInp.value = LocalStorageClass.getBirth() : birthInp.value = LocalStorageClass.getUserData().birth;
  LocalStorageClass.getLinkedIn() ? linkedinInp.value = LocalStorageClass.getLinkedIn() : linkedinInp.value = LocalStorageClass.getUserData().linkedin;
  LocalStorageClass.getGithub() ? githubInp.value = LocalStorageClass.getGithub() : githubInp.value = LocalStorageClass.getUserData().github;

  // LocalStorageClass.getUserData().ava != noAvatarURL ?
    // deleteAvatar.style.display = 'block' :
    // deleteAvatar.style.display = 'none';

  change_info.onclick = () => {
    save_info.style.display = 'block';
    change_info.style.display = 'none';
    discard_info.style.display = 'block';
    userInfoBlock.style.display = 'block';

    lists();
  }

  save_info.onclick = async () => {
    if (
      helpMessageUser.style.display == 'none' &&
      helpMessageBirth.style.display == 'none' &&
      helpMessageLinkedin.style.display == 'none' &&
      helpMessageGithub.style.display == 'none'
    ) {
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
      await saveInfo(userUpd)
        .then( () => {
          save_info.style.display = 'none';
          change_info.style.display = 'block';
          userInfoBlock.style.display = 'none';
          discard_info.style.display = 'none';
        });
      await deleteUserDataLS();
      renderPosts();
    } else errorNotification(ERROR_MESSAGE.errorValidChangeData);
  }

  discard_info.onclick = () => {
    deleteUserDataLS();
    save_info.style.display = 'none';
    discard_info.style.display = 'none';
    change_info.style.display = 'block';
    userInfoBlock.style.display = 'none';
  }

  avatar.oninput = async event => {
      const avaName = document.getElementById('file').value;
      await loadPhoto(event, avaName);
      updAvatar();
      deleteAvatar.style.display = 'block';
  }

  deleteAvatar.onclick = async () => {
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
