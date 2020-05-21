import {FIRST_USE_SET_LOADING, GET_DATA} from '../constants/firstUseConst';

const initialNavigationState = {
  data: undefined,
  loading: false,
};

export const FirstUseReducer = (state = initialNavigationState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case FIRST_USE_SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};
