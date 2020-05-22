import moment from 'moment';

export function timeStampToString(date, format) {
  return moment(date.seconds * 1000).format(format);
}
