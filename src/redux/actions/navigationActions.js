import {CHANGE_STACK} from '../constants/navigationConst';

export function changeStack(newStack) {
  return {
    type: CHANGE_STACK,
    newStack,
  };
}
