import { routes } from './routes';

export const webPageLinks = () => {
  const my_page = document.getElementById('my-page');
  const news = document.getElementById('news');
  const friends = document.getElementById('friends');
  const photos = document.getElementById('photos');
  const music = document.getElementById('music');
  const videos = document.getElementById('videos');

  my_page.onclick = () => window.location.href = routes.home;
  news.onclick = () => window.location.href = routes.news;
}
