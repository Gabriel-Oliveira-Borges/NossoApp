import firebase from '../config/firebase';

export default class SecretsBackend {

  static addSecretConfig(config) {
    return new Promise((res, rej) => {
      firebase
        .firestore()
        .collection('secrets')
        .add(config)
        .then(() => res())
        .catch(() => rej());
    });
  }

  static getSecretPassword(callback) {
    try {
      firebase
        .firestore()
        .collection('passwords')
        .doc('secretPassword')
        .onSnapshot((doc) => callback(doc.data().password));
    } catch (e) {
      console.error('getSecretPassword error: ', e);
    }
  }

  static getSecretsConfigs(callback) {
    try {
      firebase
        .firestore()
        .collection('secrets')
        .onSnapshot(callback);
    } catch (e) {
      console.error('getSecretPassword error: ', e);
    }
  }
}
