import {CHANGE_STACK} from '../constants/navigationConst';

const initialNavigationState = {
  currentStack: undefined,
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
