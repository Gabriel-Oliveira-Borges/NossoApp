import React from 'react';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import MediasStack from './MediasStack';
import {ChangeStackHandler} from '../../utils/navigation/ChangeStackHandler';
import {View, Text, Image} from 'react-native';
import ArrowIcon from '../../assets/images/backArrow.png';

const CloseDrawerView = () => (
  <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
    <Image source={ArrowIcon} style={{width: 25, height: 25}} />
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
      <Drawer.Screen name="Nossos momentos  <3" component={MediasStack} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
