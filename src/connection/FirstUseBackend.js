import firebase from '../config/firebase';

export default class FirstUseBackend {
  static getFirstUseData(callback) {
    try {
      firebase
        .firestore()
        .collection('firstUse')
        .orderBy('index')
        .onSnapshot(callback);
    } catch (e) {
      console.log('getFirstUseData error: ', e);
    }
  }
}
