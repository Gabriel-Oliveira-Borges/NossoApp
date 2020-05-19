import {NavigationReducer} from './NavigationReducer';
import {MediaReducer} from './MediaReducer';
import {combineReducers} from 'redux';

const Reducers = combineReducers({
  navigation: NavigationReducer,
  medias: MediaReducer,
});

export default Reducers;
