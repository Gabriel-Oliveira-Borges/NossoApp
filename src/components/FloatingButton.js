import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import cameraIcon from '../assets/images/camera.png';
import folderIcon from '../assets/images/folder.png';
import linkIcon from '../assets/images/link.png';
import reticencesIcon from '../assets/images/reticences.png';
export default class FloatingButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: true,
    };

    this.renderCollapsed = this.renderCollapsed.bind(this);
  }

  renderCollapsed() {
    return (
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => this.setState({isCollapsed: false})}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    );
  }

  renderExtended() {
    const {onFilesPress, onCameraPress, onLinkPress} = this.props;
    return (
      <View>
        <TouchableOpacity style={styles.touchable} onPress={onCameraPress}>
          <Image source={cameraIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable} onPress={onFilesPress}>
          <Image source={folderIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable} onPress={onLinkPress}>
          <Image source={linkIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onLongPress={() => this.props.navigation.navigate('EnterPasswordScreen')}
          style={styles.touchable}
          onPress={() => this.setState({isCollapsed: true})}>
          <Image source={reticencesIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const {onPress} = this.props;
    const {isCollapsed} = this.state;
    return (
      <View style={styles.button}>
        {isCollapsed ? this.renderCollapsed() : this.renderExtended()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'white',
    fontSize: 22,
  },
  touchable: {
    backgroundColor: 'rgb(0, 127, 255)',
    borderRadius: 25,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 7,
  },
});
