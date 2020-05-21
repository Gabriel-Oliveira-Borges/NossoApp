import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

export default class FirstUseItem extends React.Component {
  render() {
    const {currentItem, isLastItem} = this.props;
    const {item} = currentItem;
    return (
      <View style={styles.itemContainer}>
        <Image
          resizeMode="cover"
          style={styles.itemImage}
          source={{uri: item.url}}
        />
        <Text style={styles.itemText}>{item.text}</Text>
        {isLastItem && <Text>Último item</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    margin: 40,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'floralwhite',
    borderRadius: 25,
  },
  itemImage: {
    borderRadius: 25,
    width: '100%',
    flex: 7,
  },
  itemText: {
    flex: 2,
  },
});
