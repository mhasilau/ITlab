import { routes, paths } from './shared/constants/routes';
import { signInHandler,showHidePasswordIn } from './components/sign-in/sign-in';
import { signUpHandler, showHidePasswordUp, showMessageBoard } from './components/sign-up/sign-up';
import { getToken } from './shared/local-storage/ls-config';

import './styles/style.scss';

window.onload = () => {
  const pathname = Object.values(paths).find( path => path === window.location.pathname);
  switch (pathname) {
    case paths.home:
      const token = getToken();
      if (!token) {
          window.location.href = routes.sign_in;
      } else {

      }
      break;
    case paths.sign_in:
      signInHandler();
      showHidePasswordIn();
      break;
    case paths.sign_up:
      signUpHandler();
      showHidePasswordUp();
      showMessageBoard();
      break;
    default:
      break;
  }
}