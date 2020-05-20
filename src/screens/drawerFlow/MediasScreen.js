import React from 'react';
import {connect} from 'redux';
import {View, Text, Button} from 'react-native';
import {ChangeStackHandler} from '../../utils/navigation/ChangeStackHandler';

class MediaScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Media screen drawer</Text>
        <Button
          title="Clica aqui para mudar de stack"
          onPress={ChangeStackHandler.changeToFirstUseNavigation}
        />
      </View>
    );
  }
}

export default /* connect(null, null)( */ MediaScreen /* ) */;
