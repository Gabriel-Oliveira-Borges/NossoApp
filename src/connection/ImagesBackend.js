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

  static async uploadMedias(medias) {
    try {
      const result = await firebase.storage().ref().putMedias(medias);
      console.log(result);
    } catch (e) {
      console.error('uploadMedias error: ', e);
    }
  }
}
