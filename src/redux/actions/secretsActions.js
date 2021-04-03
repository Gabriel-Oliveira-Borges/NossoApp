import {SET_SECRET_PASSWORD, SET_HAS_PASSWORD_BEEN_ENTERED, SET_SECRETS_CONFIGS} from '../constants/secretsConst';

export function setSecretPassword(password) {
  return {
    type: SET_SECRET_PASSWORD,
    password,
  };
}

export function setHasPasswordBeenEntered(password) {
  return {
    type: SET_HAS_PASSWORD_BEEN_ENTERED,
    password,
  };
}

export function setSecretsConfigs(secretsConfigs) {
  return {
    type: SET_SECRETS_CONFIGS,
    secretsConfigs,
  };
}
