import {NavigationReducer} from './NavigationReducer';
import {combineReducers} from 'redux';

const Reducers = combineReducers({
  navigation: NavigationReducer,
});

export default Reducers;
