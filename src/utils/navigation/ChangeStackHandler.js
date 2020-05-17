import {store} from '../../redux/index';
import {changeStack} from '../../redux/actions/navigationActions';
import {DRAWER_NAVIGATION, FIRST_USE_STACK} from './NavigationConst';
import {isFirstUse, setFirstUse} from '../storage/NavigationStorage';
export class ChangeStackHandler {
  static changeToDrawerNavigation() {
    setFirstUse(false);
    store.dispatch(changeStack(DRAWER_NAVIGATION));
  }

  static changeToFirstUseNavigation() {
    setFirstUse(true);
    store.dispatch(changeStack(FIRST_USE_STACK));
  }

  static async onAppStarted() {
    const result = await isFirstUse();

    if (result) {
      store.dispatch(changeStack(FIRST_USE_STACK));
    } else {
      store.dispatch(changeStack(DRAWER_NAVIGATION));
    }
  }
}
