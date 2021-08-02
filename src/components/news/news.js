import { renderPosts, logout } from '../../home/home';
import { webPageLinks } from '../../shared/constants/location';

export const newsHandler = () => {
  webPageLinks();
  renderPosts();
  logout();
}