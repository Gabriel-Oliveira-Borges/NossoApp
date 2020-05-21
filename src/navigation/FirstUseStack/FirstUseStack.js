import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from '../../screens/firstUseFlow/StartScreen';

const Stack = createStackNavigator();
function FirstUseStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default FirstUseStack;
