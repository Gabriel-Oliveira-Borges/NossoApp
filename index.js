import {AppRegistry, StatusBar} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/index';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
// import {decode, encode} from 'base-64';

// if (!global.btoa) {
//   global.btoa = encode;
// }

// if (!global.atob) {
//   global.atob = decode;
// }

class AppClass extends React.Component {
  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar hidden={true} />
          <App />
        </NavigationContainer>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => AppClass);
