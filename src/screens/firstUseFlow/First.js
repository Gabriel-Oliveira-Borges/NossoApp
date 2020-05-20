import React from 'react';
import {Text, View, Button} from 'react-native';
import {ChangeStackHandler} from '../../utils/navigation/ChangeStackHandler';

export default class Index extends React.Component {
  render() {
    return (
      <View>
        <Text onPress={() => this.props.navigation.navigate('Second')}>
          Primeiro aqui
        </Text>
        <Button
          title="Primeiro uso. Mudar"
          onPress={ChangeStackHandler.changeToDrawerNavigation}
        />
      </View>
    );
  }
}
