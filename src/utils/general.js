import moment from 'moment';
import {store} from '../redux/index';
import {setLoading} from '../redux/actions/mediaActions';
import {Platform, CameraRoll} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export function timeStampToString(date, format) {
  return moment(date.seconds * 1000).format(format);
}

export function pathToBlob(path) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      // return the blob
      resolve(xhr.response);
    };

    xhr.onerror = function () {
      // something went wrong
      reject(new Error('uriToBlob failed'));
    };
    // this helps us get a blob
    xhr.responseType = 'blob';
    xhr.open('GET', path, true);

    xhr.send(null);
  });
}

export function setMediasScreenLoading(value) {
  store.dispatch(setLoading(value));
}

export function create_UUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
    c,
  ) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

export function filePathToDate(filePath) {
  const regex = /(IMG|VID)_\d{8}/g;

  const result = regex.exec(filePath);

  if (!result) return moment();

  const dateString = result[0]?.replace(/(VID|IMG)_/g, '');

  if (!dateString || dateString.length < 8) return moment();

  return moment(dateString, 'YYYYMMDD');
}

export function timeStampToMoment(timestamp) {
  const seconds = timestamp?.seconds || timestamp;

  return seconds ? moment(new Date(seconds * 1000)) : moment();
}

export function downloadMedia(media) {
  const {uri, id} = media;
  const imageName = id;

  const dir = RNFetchBlob.fs.dirs;
  const path =
    Platform.OS === 'ios'
      ? dir['MainBundleDir'] + '/' + imageName
      : dir.PictureDir + '/' + imageName;

  if (Platform.OS == 'android') {
    return RNFetchBlob.config({
      fileCache: true,
      appendExt: 'png',
      indicator: true,
      IOSBackgroundTask: true,
      path: path,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: path,
        description: 'Image',
      },
    })
      .fetch('GET', uri)
      .then((res) => res);
  } else {
    CameraRoll.saveToCameraRoll(uri);
  }
}
