import ImagesBackend from './ImagesBackend';
import FirstUseBackend from './FirstUseBackend';
import SecretsBackend from './SecretsBackend';

export default class Backend {
  static getAllMediasSnap(callback) {
    ImagesBackend.getAllMediasSnap(callback);
  }

  static getSecretPassword(callback) {
    SecretsBackend.getSecretPassword(callback);
  }

  static getSecretsConfigs(callback) {
    SecretsBackend.getSecretsConfigs(callback);
  }

  static addSecretConfig(config) {
    return SecretsBackend.addSecretConfig(config)
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
