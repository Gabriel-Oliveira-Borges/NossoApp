import Backend from '../../connection/Backend';
import FirebaseToReduxMapper from './FirebaseToReduxMapper';
import {store} from '../../redux/index';
import {setLoading} from '../../redux/actions/mediaActions';
import {setFirstUseLoading} from '../../redux/actions/firstUseActions';

export class AddToRedux {
  static getAllMedias() {
    store.dispatch(setLoading(true));
    Backend.getAllMediasSnap(FirebaseToReduxMapper.mapToMedias);
    Backend.getSecretsConfigs(FirebaseToReduxMapper.mapSecretConfigs);
  }

  static getFirstUseData() {
    store.dispatch(setFirstUseLoading(true));
    Backend.getFirstUseData(FirebaseToReduxMapper.mapToFirstUse);
  }

  static getSecretPassword() {
    Backend.getSecretPassword(FirebaseToReduxMapper.mapSecretPassword);
  }
}
