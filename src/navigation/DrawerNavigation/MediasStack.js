import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MediaScreen from '../../screens/drawerFlow/MediasScreen';
import DrawerScreenHeaderOptions from '../../components/DrawerScreenHeaderOptions';
import AddMedias from '../../screens/drawerFlow/AddMedias';

const Stack = createStackNavigator();
function MediasStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MediaScreen"
        component={MediaScreen}
        options={{
          ...DrawerScreenHeaderOptions(props),
          title: 'Mudar aqui',
        }}
      />
      <Stack.Screen
        name="AddMedias"
        component={AddMedias}
        options={{
          ...DrawerScreenHeaderOptions(props),
          title: 'Mudar aqui também (colocar pra voltar)',
        }}
      />
    </Stack.Navigator>
  );
}

export default MediasStack;
