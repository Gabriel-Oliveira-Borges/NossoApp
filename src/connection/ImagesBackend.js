import firebase from '../config/firebase';

export default class ImagesBackend {
  static getAllMediasSnap(callback) {
    try {
      firebase.firestore().collection('images').onSnapshot(callback);
    } catch (e) {
      console.log('getAllImagesSnap error: ', e);
    }
  }
}
