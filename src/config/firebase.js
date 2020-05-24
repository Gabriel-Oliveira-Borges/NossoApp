import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import {pathToBlob} from '../utils/general';

const config = {
  apiKey: 'AIzaSyDb8oKVLsxoh5SfgPnmPsXw8-dEPkS6RWo',
  authDomain: 'nosso-app-20583.firebaseapp.com',
  databaseURL: 'https://nosso-app-20583.firebaseio.com',
  projectId: 'nosso-app-20583',
  storageBucket: 'nosso-app-20583.appspot.com',
  messagingSenderId: '777075973358',
  appId: '1:777075973358:web:5e2bff219803c8bee667ff',
};

firebase.initializeApp(config);
// firebase.firestore.setLogLevel('debug');
firebase.firestore().settings({experimentalForceLongPolling: true});

firebase.storage().ref().constructor.prototype.putMedias = (medias) => {
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

export default firebase;
