import React from 'react';
import {Text, View, Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

class DrawerScreenHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.openDrawer}>
        <Text>Icone</Text>
      </TouchableOpacity>
    );
  }
}

const options = (openDrawer) => ({
  title: 'Título genérico',
  headerLeft: () => <DrawerScreenHeader openDrawer={openDrawer} />,
  headerStyle: {
    backgroundColor: '#FF9800',
  },
  headerTintColor: '#fff',
});

export default options;
