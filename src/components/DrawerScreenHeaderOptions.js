import React from 'react';
import {Text, View, Button, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import sandwichMenu from '../assets/images/sandwichMenu.png';
import backArrow from '../assets/images/backArrow.png';
class DrawerScreenHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {isBackButton} = this.props;
    return (
      <TouchableOpacity
        onPress={
          isBackButton
            ? this.props.navigationProps.navigation.goBack
            : this.props.navigationProps.navigation.openDrawer
        }>
        <Image
          source={isBackButton ? backArrow : sandwichMenu}
          style={{width: 20, height: 20, marginLeft: 10}}
        />
      </TouchableOpacity>
    );
  }
}

const options = (props, back) => ({
  headerLeft: () => (
    <DrawerScreenHeader navigationProps={props} isBackButton={back} />
  ),
  headerStyle: {
    backgroundColor: 'floralwhite',
  },
  headerTintColor: 'rgb(0, 0, 0)',
});

export default options;
