import {store} from '../../redux/index';
import {changeStack} from '../../redux/actions/navigationActions';
import {DRAWER_NAVIGATION, FIRST_USE_STACK} from './NavigationConst';
export class ChangeStackHandler {
  static changeToDrawerNavigation() {
    store.dispatch(changeStack(DRAWER_NAVIGATION));
  }

  static changeToFirstUseNavigation() {
    store.dispatch(changeStack(FIRST_USE_STACK));
  }
}
