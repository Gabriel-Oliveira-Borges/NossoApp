import {AsyncStorage} from 'react-native';
const FIRST_USE_KEY = 'FIRST_USE_KEY';

export async function setFirstUse(value) {
  try {
    await AsyncStorage.setItem(FIRST_USE_KEY, JSON.stringify(value));
  } catch (exception) {
    console.log('Ocorreu um erro: ', exception);
  }
}

export async function isFirstUse() {
  try {
    const result = await AsyncStorage.getItem(FIRST_USE_KEY);
    return JSON.parse(result || result === null);
  } catch (exception) {
    console.log('Ocorreu um erro: ', exception);
  }
}
