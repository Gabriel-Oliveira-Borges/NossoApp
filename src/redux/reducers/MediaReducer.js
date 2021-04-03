import {
  UPDATE_MEDIAS,
  SET_LOADING,
  SET_SELECTED_SECRETS_CONFIGS,
} from '../constants/mediaConst';

const initialNavigationState = {
  data: undefined,
  loading: false,
  selectedSecretsConfigs: [],
  dataBackup: undefined,
};

export const MediaReducer = (state = initialNavigationState, action) => {
  switch (action.type) {
    case UPDATE_MEDIAS:
      return {
        ...state,
        data: filterDataAccordinglyWithConfigs(
          action.medias,
          state.selectedSecretsConfigs,
        ),
        dataBackup: action.medias,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_SELECTED_SECRETS_CONFIGS: {
      return {
        ...state,
        selectedSecretsConfigs: action.selectedSecretsConfigs,
        data: filterDataAccordinglyWithConfigs(
          state.dataBackup,
          action.selectedSecretsConfigs,
        ),
      };
    }
    default:
      return state;
  }
};

function filterDataAccordinglyWithConfigs(data, selectedSecretsConfigs) {
  if (!selectedSecretsConfigs || selectedSecretsConfigs.length === 0) {
    return data?.filter((media) => !media.secretIds || media.secretIds.length === 0);
  }
  return data?.filter(
    (media) => mediaSecretIdsInSelectedSecretsConfigs(media, selectedSecretsConfigs)
  );
}

function mediaSecretIdsInSelectedSecretsConfigs(media, selectedSecretsConfigs) {
  for (let secretIdCount = 0; secretIdCount < media.secretIds?.length || 0; secretIdCount++) {
    if (selectedSecretsConfigs.indexOf(media.secretIds[secretIdCount]) != -1) {
      return true;
    }
  }
  return false;
}
