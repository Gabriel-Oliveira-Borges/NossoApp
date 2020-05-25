import firebase from '../config/firebase';
import {pathToBlob, setMediasScreenLoading} from '../utils/general';

firebase.storage().ref().constructor.prototype.putMediasInStorage = (
  medias,
) => {
  return Promise.all(
    medias.map(async (media) => {
      const fileName = media.modificationDate + '.' + media.mime.split('/')[1];
      const blob = await pathToBlob(media.path);
      return firebase
        .storage()
        .ref()
        .child(fileName)
        .put(blob, {contentType: media.mime});
    }),
  );
};

firebase.firestore().constructor.prototype.putMediasInFirestore = (
  medias,
  storageResult,
) => {
  return Promise.all(
    medias.map(async (media, i) => {
      const downloadUrl = await storageResult[i].ref.getDownloadURL();
      return firebase
        .firestore()
        .collection('medias')
        .add({
          isVideo: media.isVideo,
          description: media.description,
          date: firebase.firestore.Timestamp.fromDate(new Date(media.date)),
          uri: downloadUrl,
        });
    }),
  );
};

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
      setMediasScreenLoading(true);
      const result = await firebase.storage().ref().putMediasInStorage(medias);
      await firebase.firestore().putMediasInFirestore(medias, result);
      setMediasScreenLoading(false);
    } catch (e) {
      setMediasScreenLoading(false);
      console.error('uploadMedias error: ', e);
    }
  }
}
