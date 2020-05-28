import {store} from '../../redux/index';
import {updateMedias} from '../../redux/actions/mediaActions';
import {setFirstUseData} from '../../redux/actions/firstUseActions';
import {timeStampToMoment} from '../general';
export default class FirebaseToReduxMapper {
  static mapToMedias(response) {
    if (response.empty) {
      store.dispatch(updateMedias(undefined));
    } else {
      const medias = [];
      response.docs.forEach((doc) => {
        const media = doc.data();
        media.id = doc.ref.id;
        media.date = timeStampToMoment(media.date);
        medias.push(media);
      });

      store.dispatch(updateMedias(medias));
    }
  }

  static mapToFirstUse(response) {
    if (response.empty) {
      store.dispatch(setFirstUseData(undefined));
    } else {
      const data = [];
      response.docs.forEach((doc) => data.push(doc.data()));

      store.dispatch(setFirstUseData(data));
    }
  }
}
