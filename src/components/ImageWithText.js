import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {timeStampToString} from '../utils/general';

export default class ImageWithText extends React.Component {
  render() {
    const {date, description, uri} = this.props.item;

    return (
      <View style={styles.container}>
        <Image resizeMode="cover" style={styles.image} source={{uri: uri}} />
        <View style={styles.textsView}>
          {date && (
            <Text style={styles.dateText}>
              {timeStampToString(date, 'DD/MM/YYYY')}
            </Text>
          )}
          {!!description && <Text>{description}</Text>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 25,
    elevation: 2,
  },
  dateText: {
    alignSelf: 'flex-end',
  },
  image: {
    height: 350,
    width: '100%',
    padding: 5,
    borderRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  textsView: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
