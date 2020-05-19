import Backend from '../../connection/Backend';
import FirebaseToReduxMapper from './FirebaseToReduxMapper';
import {store} from '../../redux/index';
import {setLoading} from '../../redux/actions/mediaActions';

export class AddToRedux {
  static getAllMedias() {
    store.dispatch(setLoading(true));
    Backend.getAllMediasSnap(FirebaseToReduxMapper.mapToMedias);
  }
}
