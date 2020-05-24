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
}
