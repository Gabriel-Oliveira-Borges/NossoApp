import {UPDATE_MEDIAS, SET_LOADING} from '../constants/mediaConst';

export function updateMedias(medias) {
  return {
    type: UPDATE_MEDIAS,
    medias,
  };
}

export function setLoading(loading) {
  return {
    type: SET_LOADING,
    loading,
  };
}
