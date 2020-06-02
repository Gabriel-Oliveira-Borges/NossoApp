import React from 'react';
import {View, Image, Text, StyleSheet, Button} from 'react-native';
import {ChangeStackHandler} from '../utils/navigation/ChangeStackHandler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import SwipeArrow from '../assets/images/SwipeArrow.png';

export default class FirstUseItem extends React.Component {
  renderLastItem() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Swipeable
          enabled={true}
          renderLeftActions={() => (
            <View
              style={{
                backgroundColor: 'floralwhite',
                alignItems: 'center',
                justifyContent: 'center',
                borderTopLeftRadius: 25,
                borderBottomLeftRadius: 25,
                padding: 15,
              }}>
              <Text>Ver app</Text>
            </View>
          )}
          onSwipeableLeftOpen={ChangeStackHandler.changeToDrawerNavigation}>
          <View
            style={{
              backgroundColor: 'floralwhite',
              alignSelf: 'stretch',
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 25,
              padding: 15,
            }}>
            <View
              style={{
                backgroundColor: '#5E5E5E',
                alignSelf: 'flex-start',
                justifyContent: 'center',
                padding: 5,
              }}>
              <Image source={SwipeArrow} style={{width: 20, height: 20}} />
            </View>
            <Text
              style={{
                alignSelf: 'center',
                marginLeft: 15,
                color: 'rgba(0,0,0,0.5)',
                fontStyle: 'italic',
              }}>
              Deslise para ver o app
            </Text>
          </View>
        </Swipeable>
      </View>
    );
  }

  render() {
    const {currentItem, isLastItem} = this.props;
    const {item} = currentItem;

    if (isLastItem) return this.renderLastItem();
    return (
      <View style={styles.itemContainer}>
        <Image
          resizeMode="cover"
          style={styles.itemImage}
          source={{uri: item.uri}}
        />
        <Text style={styles.itemText}>{item.text}</Text>
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
