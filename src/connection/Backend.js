import ImagesBackend from './ImagesBackend';
import FirstUseBackend from './FirstUseBackend';

export default class Backend {
  static getAllMediasSnap(callback) {
    ImagesBackend.getAllMediasSnap(callback);
  }

  static getFirstUseData(callback) {
    FirstUseBackend.getFirstUseData(callback);
  }

  static uploadMedias(medias) {
    ImagesBackend.uploadMedias(medias);
  }

  static deleteMedia(media) {
    ImagesBackend.deleteMedia(media);
  }

  static EditMedia(medias) {
    const media = medias[0];
    ImagesBackend.editMedia(media);
  }
}
