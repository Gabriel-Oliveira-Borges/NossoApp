import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Index from '../screens/firstUseFlow/First';
import Second from '../screens/firstUseFlow/Second';

const Stack = createStackNavigator();
function FirstUseStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="First" component={Index} />
      <Stack.Screen name="Second" component={Second} />
    </Stack.Navigator>
  );
}

export default FirstUseStack;
