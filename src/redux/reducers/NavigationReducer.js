import {FIRST_USE_STACK} from '../../utils/navigation/NavigationConst';
import {CHANGE_STACK} from '../constants/navigationConst';

const initialNavigationState = {
  currentStack: FIRST_USE_STACK,
};

export const NavigationReducer = (state = initialNavigationState, action) => {
  switch (action.type) {
    case CHANGE_STACK:
      return {
        ...state,
        currentStack: action.newStack,
      };

    default:
      return state;
  }
};
