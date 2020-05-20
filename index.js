import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/index';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

class AppClass extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => AppClass);
