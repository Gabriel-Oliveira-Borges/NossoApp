import {GET_DATA, FIRST_USE_SET_LOADING} from '../constants/firstUseConst';

export function setFirstUseData(data) {
  return {
    type: GET_DATA,
    data,
  };
}

export function setFirstUseLoading(loading) {
  return {
    type: FIRST_USE_SET_LOADING,
    loading,
  };
}
