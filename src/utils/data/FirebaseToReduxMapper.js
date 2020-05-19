import {store} from '../../redux/index';
import {updateMedias} from '../../redux/actions/mediaActions';

export default class FirebaseToReduxMapper {
  static mapToMedias(response) {
    if (response.empty) {
      store.dispatch(updateMedias([]));
    } else {
      const medias = [];
      response.docs.forEach((doc) => medias.push(doc.data()));

      store.dispatch(updateMedias(medias));
    }
  }
}
