import moment from 'moment';
import {store} from '../redux/index';
import {setLoading} from '../redux/actions/mediaActions';

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
