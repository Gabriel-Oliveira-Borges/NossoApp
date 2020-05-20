import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MediaScreen from '../../screens/drawerFlow/MediasScreen';
import DrawerScreenHeaderOptions from '../../components/DrawerScreenHeaderOptions';

const Stack = createStackNavigator();
function MediasStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MediaScreen"
        component={MediaScreen}
        options={{
          ...DrawerScreenHeaderOptions(props.navigation.openDrawer),
          title: 'Mudar aqui',
        }}
      />
    </Stack.Navigator>
  );
}

export default MediasStack;
