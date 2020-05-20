import React from 'react';
import {Text, View, Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

class DrawerScreenHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.navigationProps.navigation.openDrawer}>
        <Text>Icone</Text>
      </TouchableOpacity>
    );
  }
}

const options = (props) => ({
  title: 'Título genérico',
  headerLeft: () => <DrawerScreenHeader navigationProps={props} />,
  headerStyle: {
    backgroundColor: '#FF9800',
  },
  headerTintColor: '#fff',
});

export default options;
