import React from 'react';
import {Button, Text, View, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {ChangeStackHandler} from './utils/navigation/ChangeStackHandler';
import {FIRST_USE_STACK} from './utils/navigation/NavigationConst';
import {AddToRedux} from './utils/data/AddToRedux';
import {createStackNavigator} from '@react-navigation/stack';
import FirstUseStack from './navigation/FirstUseStack';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    ChangeStackHandler.onAppStarted();
    // AddToRedux.getAllMedias();
  }

  renderFirstUse = () => FirstUseStack();

  renderDrawer = () => {
    return (
      <Button
        title="Drawer. Mudar"
        onPress={ChangeStackHandler.changeToFirstUseNavigation}
      />
    );
  };

  renderLoading = () => <Text>Carregando</Text>;

  render() {
    const {currentStack} = this.props;
    return !currentStack
      ? this.renderLoading()
      : currentStack === FIRST_USE_STACK
      ? this.renderFirstUse()
      : this.renderDrawer();
  }
}

const mapStateToProps = (state) => ({
  currentStack: state.navigation.currentStack,
  medias: state.medias,
});

export default connect(mapStateToProps)(App);
