import React from 'react';
import {connect} from 'react-redux';
import {ChangeStackHandler} from './utils/navigation/ChangeStackHandler';
import {FIRST_USE_STACK} from './utils/navigation/NavigationConst';
import FirstUseStack from './navigation/FirstUseStack/FirstUseStack';
import DrawerNavigation from './navigation/DrawerNavigation/DrawerNavigation';
import LoadingComponent from './components/LoadingComponent';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    ChangeStackHandler.onAppStarted();
  }

  renderFirstUse = () => FirstUseStack();

  renderDrawer = () => DrawerNavigation();

  renderLoading = () => <LoadingComponent />;

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
