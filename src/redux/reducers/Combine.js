import {NavigationReducer} from './NavigationReducer';
import {MediaReducer} from './MediaReducer';
import {FirstUseReducer} from './FirstUseReducer';
import {SecretsReducer} from './SecretsReducer';
import {combineReducers} from 'redux';

const Reducers = combineReducers({
  navigation: NavigationReducer,
  medias: MediaReducer,
  firstUse: FirstUseReducer,
  secrets: SecretsReducer,
});

export default Reducers;
