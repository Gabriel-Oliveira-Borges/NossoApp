import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MediaScreen from '../../screens/drawerFlow/MediasScreen';
import DrawerScreenHeaderOptions from '../../components/DrawerScreenHeaderOptions';
import AddMediasScreen from '../../screens/drawerFlow/AddMediasScreen';
import SeeMediaScreen from '../../screens/drawerFlow/SeeMediaScreen';

const Stack = createStackNavigator();
function MediasStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MediaScreen"
        component={MediaScreen}
        options={{
          ...DrawerScreenHeaderOptions(props, false),
          title: 'Mudar aqui',
        }}
      />
      <Stack.Screen
        name="AddMediasScreen"
        component={AddMediasScreen}
        options={{
          ...DrawerScreenHeaderOptions(props, true),
          title: 'Adicionar um momento',
        }}
      />
      <Stack.Screen
        name="SeeMediaScreen"
        component={SeeMediaScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default MediasStack;
