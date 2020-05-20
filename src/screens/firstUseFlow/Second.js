import React from 'react';
import {Text} from 'react-native';

export default class Index extends React.Component {
  render() {
    return (
      <Text onPress={() => this.props.navigation.goBack()}>Segundo aqui</Text>
    );
  }
}
