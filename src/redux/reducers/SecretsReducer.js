import {
  SET_HAS_PASSWORD_BEEN_ENTERED,
  SET_SECRET_PASSWORD,
  SET_SECRETS_CONFIGS
} from '../constants/secretsConst';

const initialNavigationState = {
  hasPasswordBeenEntered: false,
  password: null,
  secretsConfigs: [],
};

export const SecretsReducer = (state = initialNavigationState, action) => {
  switch (action.type) {
    case SET_SECRET_PASSWORD:
      return {
        ...state,
        password: action.password,
      };
    case SET_HAS_PASSWORD_BEEN_ENTERED:
      return {
        ...state,
        hasPasswordBeenEntered: true,
      };
    case SET_SECRETS_CONFIGS:
      return {
        ...state,
        secretsConfigs: action.secretsConfigs,
      };
    default:
      return state;
  }
};
