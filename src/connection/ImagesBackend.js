import firebase from '../config/firebase';

export default class ImagesBackend {
  static getAllMediasSnap(callback) {
    try {
      firebase
        .firestore()
        .collection('medias')
        .orderBy('date')
        .onSnapshot(callback);
    } catch (e) {
      console.error('getAllImagesSnap error: ', e);
    }
  }
}
