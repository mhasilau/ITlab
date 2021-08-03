import { logout } from '../../home/home';
import { webPageLinks } from '../../shared/constants/location';
import { getPosts, getUsers } from '../../api/api-handlers';
import { localStorageFunc } from '../../shared/local-storage/ls-config';

export const newsHandler = () => {
  webPageLinks();
  renderPostsNews();
  logout();
}

export const renderPostsNews = async () => {
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

    if (user.uuid !== localStorageFunc.getUID()) {
      postPlace.style.display = 'none';
    } else postPlace.style.display = 'block';

    content.innerHTML = post.content;
    infoName.innerHTML = `${post.username}, `;
    infoDate.innerHTML = moment(post.date).format('MMM Do YY');

    postsBlock.prepend(postPlace);
    postPlace.append(content, infoName, infoDate);

  });
}
