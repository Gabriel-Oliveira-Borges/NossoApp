import React from 'react';
import {StyleSheet, Button, View} from 'react-native';
import {connect} from 'react-redux';
import {changeStack} from './redux/actions/navigationActions';
import {ChangeStackHandler} from './utils/navigation/ChangeStackHandler';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <View>
        <Button
          title="Clica ae"
          onPress={ChangeStackHandler.changeToDrawerNavigation}
        />
        <Button
          title="Clica ae"
          onPress={ChangeStackHandler.changeToFirstUseNavigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = (state) => ({
  currentStack: state.navigation.currentStack,
});

const mapDispatchProps = (dispatch) => ({
  changeStack: (newStack) => dispatch(changeStack(newStack)),
});

export default connect(mapStateToProps)(App);
