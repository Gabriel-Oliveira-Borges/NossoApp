import firebase from '../config/firebase';
import {
  pathToBlob,
  setMediasScreenLoading,
  create_UUID,
} from '../utils/general';

export default class ImagesBackend {
  static getAllMediasSnap(callback) {
    try {
      firebase
        .firestore()
        .collection('medias')
        .orderBy('date', 'desc')
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

  static async deleteMedia(media) {
    try {
      setMediasScreenLoading(true);
      await Promise.all(
        firebase.firestore().collection('medias').doc(media.id).delete(),
        firebase.storage().ref().child(media.id).delete(),
      );
      setMediasScreenLoading(false);
    } catch (e) {
      setMediasScreenLoading(false);
      console.error('deleteMedia error: ', e);
    }
  }

  static async editMedia(media) {
    try {
      setMediasScreenLoading(true);
      firebase
        .firestore()
        .collection('medias')
        .doc(media.id)
        .update({
          isVideo: media.isVideo,
          description: media.description,
          date: firebase.firestore.Timestamp.fromDate(new Date(media.date)),
          isFromLink: media.isFromLink || false,
          uri: media.uri,
        });
    } catch (e) {
      setMediasScreenLoading(false);
      console.error('deleteMedia error: ', e);
    }
  }
}

firebase.storage().ref().constructor.prototype.putMediasInStorage = (
  medias,
) => {
  return Promise.all(
    medias.map(async (media) => {
      if (media.isFromLink) return null;
      const fileName = create_UUID();
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
      const downloadUrl =
        (await (storageResult && storageResult[i]?.ref?.getDownloadURL())) ||
        media.uri;
      const doc =
        (storageResult && storageResult[i]?.ref.name) || create_UUID();
      return firebase
        .firestore()
        .collection('medias')
        .doc(doc)
        .set({
          isVideo: media.isVideo,
          description: media.description,
          date: firebase.firestore.Timestamp.fromDate(new Date(media.date)),
          isFromLink: media.isFromLink || false,
          uri: downloadUrl,
        });
    }),
  );
};
