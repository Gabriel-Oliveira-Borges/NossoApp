import {store} from '../../redux/index';
import {updateMedias} from '../../redux/actions/mediaActions';
import {setFirstUseData} from '../../redux/actions/firstUseActions';
import {setSecretPassword, setSecretsConfigs} from '../../redux/actions/secretsActions';
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

  static mapSecretConfigs(response) {
    const configs = response.docs.map((doc) => {
      const config = doc.data();
      config.id = doc.ref.id;
      return config;
    });
    store.dispatch(setSecretsConfigs(configs));
  }

  static mapSecretPassword(password) {
    store.dispatch(setSecretPassword(password));
  }

  static mapToFirstUse(response) {
    if (response.empty) {
      store.dispatch(setFirstUseData(undefined));
    } else {
      const data = [];
      response.docs.forEach((doc) => data.push(doc.data()));
      data.push({}); // para aparecer a última tela
      store.dispatch(setFirstUseData(data));
    }
  }
}
