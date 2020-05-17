import React from 'react';
import {StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';
import {changeStack} from './redux/actions/navigationActions';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return <Button title="Clica ae" />;
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
