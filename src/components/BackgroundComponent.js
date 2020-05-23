import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import backgroundImage from '../assets/images/backgroundImage.png';

export default class BackgroundComponent extends React.Component {
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
