import React from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import moment from 'moment';

export default class AddMediaItem extends React.Component {
  constructor(props) {
    super(props);
  }

  renderLastItem() {
    const {handleImagesUpload} = this.props;
    return (
      <View style={styles.itemContainer}>
        <Text>Último item</Text>
        <Button title="fazer upload" onPress={handleImagesUpload} />
      </View>
    );
  }

  render() {
    const {isLastItem, media} = this.props;

    if (isLastItem || !media) return this.renderLastItem();

    const {description, date, path} = media;
    return (
      <View style={styles.itemContainer}>
        <Image
          resizeMode="cover"
          style={styles.itemImage}
          source={{uri: path}}
        />
        <Text>Botar a opção para vídeo também</Text>
        <Text>{description}</Text>
        <Text>{moment(date).format('DD/MM/YYYY')}</Text>
        <Text>{path}</Text>
        {isLastItem && <Text>último</Text>}
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
