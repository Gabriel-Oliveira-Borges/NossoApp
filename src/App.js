import React from 'react';
import {Button, Text} from 'react-native';
import {connect} from 'react-redux';
import {ChangeStackHandler} from './utils/navigation/ChangeStackHandler';
import {FIRST_USE_STACK} from './utils/navigation/NavigationConst';
import Backend from './connection/Backend';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    ChangeStackHandler.onAppStarted();
  }

  renderFirstUse = () => (
    <Button
      title="Primeiro uso. Mudar"
      onPress={ChangeStackHandler.changeToDrawerNavigation}
    />
  );

  renderDrawer = () => (
    <Button
      title="Drawer. Mudar"
      // onPress={ChangeStackHandler.changeToFirstUseNavigation}
      onPress={Backend.teste}
    />
  );

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
});

export default connect(mapStateToProps)(App);
