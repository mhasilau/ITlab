import moment from 'moment';

import { logout } from '../../home/home';
import { webPageLinks } from '../../shared/constants/location';
import { getPosts, getUsers } from '../../api/api-handlers';
import { LocalStorageClass } from '../../shared/local-storage/ls-config';

export const newsHandler = () => {
  webPageLinks();
  renderPostsNews();
  logout();
}

export const renderPostsNews = async () => {
  const postsBlock = document.querySelector('.render-posts');
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

    postPlace.className = 'render-posts-post';
    content.className = 'render-posts-content';
    infoName.className = 'render-posts-info';
    infoDate.className = 'render-posts-info';

    (user.uuid !== LocalStorageClass.getUID()) ? postPlace.style.display = 'block' : postPlace.style.display = 'none';

    content.innerHTML = post.content;
    infoName.innerHTML = `${user.username}, `;
    infoDate.innerHTML = moment(post.date).format('lll');

    postsBlock.prepend(postPlace);
    postPlace.append(content, infoName, infoDate);
  });
}
