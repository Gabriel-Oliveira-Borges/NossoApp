import firebase from '../config/firebase';

export default class Backend {
  static async teste() {
    try {
      const value = await firebase
        .firestore()
        .collection('teste')
        .doc('teste2')
        .onSnapshot();

      console.log(value);
    } catch (e) {
      console.log(e);
    }
  }
}
