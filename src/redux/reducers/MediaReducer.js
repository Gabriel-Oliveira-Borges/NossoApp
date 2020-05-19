import {UPDATE_MEDIAS, SET_LOADING} from '../constants/mediaConst';

const initialNavigationState = {
  files: undefined,
  loading: false,
};

export const MediaReducer = (state = initialNavigationState, action) => {
  switch (action.type) {
    case UPDATE_MEDIAS:
      return {
        ...state,
        files: action.medias,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};
