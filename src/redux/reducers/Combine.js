import {NavigationReducer} from './NavigationReducer';
import {MediaReducer} from './MediaReducer';
import {FirstUseReducer} from './FirstUseReducer';
import {combineReducers} from 'redux';

const Reducers = combineReducers({
  navigation: NavigationReducer,
  medias: MediaReducer,
  firstUse: FirstUseReducer,
});

export default Reducers;
