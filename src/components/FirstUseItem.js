import React from 'react';
import {View, Image, Text, StyleSheet, Button} from 'react-native';
import {ChangeStackHandler} from '../utils/navigation/ChangeStackHandler';

export default class FirstUseItem extends React.Component {
  render() {
    const {currentItem, isLastItem} = this.props;
    const {item} = currentItem;
    return (
      <View style={styles.itemContainer}>
        <Image
          resizeMode="cover"
          style={styles.itemImage}
          source={{uri: item.uri}}
        />
        <Text style={styles.itemText}>{item.text}</Text>
        {isLastItem && (
          <View style={styles.itemText}>
            <Text>{item.text}</Text>
            <Button
              title="Primeiro uso. Mudar"
              onPress={ChangeStackHandler.changeToDrawerNavigation}
            />
          </View>
        )}
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
    flex: 1,
  },
  itemText: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    textAlign: 'justify',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    color: 'white',
    borderRadius: 25,
  },
});
