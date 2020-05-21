import React from 'react';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import MediasScreen from '../../screens/drawerFlow/MediasScreen';
import MediasStack from './MediasStack';
import {ChangeStackHandler} from '../../utils/navigation/ChangeStackHandler';
import {View, Text} from 'react-native';

const CloseDrawerView = () => (
  <View>
    <Text>Icon</Text>
    <Text>Fechar</Text>
  </View>
);

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView>
    <DrawerItem
      label={(props) => CloseDrawerView(props)}
      onPress={() => {
        props.navigation.closeDrawer();
      }}
    />
    <DrawerItemList {...props} />
    <DrawerItem
      label="Ver mensagem inicial"
      onPress={() => {
        props.navigation.closeDrawer();
        ChangeStackHandler.changeToFirstUseNavigation();
      }}
    />
  </DrawerContentScrollView>
);

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator keyboardDismissMode drawerContent={CustomDrawerContent}>
      <Drawer.Screen name="Mudar aqui" component={MediasStack} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
