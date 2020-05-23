import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class FloatingButton extends React.Component {
  render() {
    const {onPress} = this.props;
    console.log(onPress);
    return (
      <View style={styles.button}>
        <TouchableOpacity style={styles.touchable} onPress={onPress}>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
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
  text: {
    color: 'white',
    fontSize: 20,
  },
  touchable: {
    backgroundColor: 'rgb(0, 127, 255)',
    borderRadius: 25,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
