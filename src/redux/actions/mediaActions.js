import {UPDATE_MEDIAS, SET_LOADING, SET_SELECTED_SECRETS_CONFIGS} from '../constants/mediaConst';

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

export function setSelectedSecretConfigs(selectedSecretsConfigs) {
  return {
    type: SET_SELECTED_SECRETS_CONFIGS,
    selectedSecretsConfigs,
  };
}