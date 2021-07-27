import { routes, paths } from './shared/constants/routes';
import { signInHandler,showHidePasswordIn, showMessageBoardIn } from './components/sign-in/sign-in';
import { signUpHandler, showHidePasswordUp, showMessageBoardUp } from './components/sign-up/sign-up';
import { getToken } from './shared/local-storage/ls-config';
import { postForm, logout } from './home/home';

import './styles/style.scss';

window.onload = () => {
  const pathname = Object.values(paths).find( path => path === window.location.pathname);
  switch (pathname) {
    case paths.home:
      const token = getToken();
      if (!token) {
          window.location.href = routes.sign_in;
      }
      postForm();
      logout();
      break;
    case paths.sign_in:
      signInHandler();
      showHidePasswordIn();
      showMessageBoardIn();
      break;
    case paths.sign_up:
      signUpHandler();
      showHidePasswordUp();
      showMessageBoardUp();
      break;
    default:
      break;
  }
}
