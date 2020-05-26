import React from 'react';
import {View, Text, StyleSheet, Image, Button, TextInput} from 'react-native';
import moment from 'moment';
import Video from 'react-native-video';
import LoadingScreen from './LoadingComponent';

export default class AddMediaItem extends React.Component {
  constructor(props) {
    super(props);
  }

  renderLastItem() {
    const {handleMediasUpload} = this.props;
    return (
      <View style={styles.itemContainer}>
        <Text>Último item</Text>
        <Button title="fazer upload" onPress={handleMediasUpload} />
      </View>
    );
  }

  renderImage() {
    const {path} = this.props.media;
    return (
      <Image resizeMode="cover" style={styles.itemMedia} source={{uri: path}} />
    );
  }

  renderVideo() {
    const {path} = this.props.media;
    return (
      <Video
        ref={(ref) => {
          this.player = ref;
        }}
        style={styles.itemMedia}
        source={{uri: path}}
        controls={true}
        disableFocus={true}
        poster={path}
        resizeMode="contain"
        fullscreen
      />
    );
  }

  renderLoading = () => <LoadingScreen />;

  render() {
    const {isLastItem, media, onChangeDescription, loading} = this.props;

    if (loading) return this.renderLoading();

    if (isLastItem || !media) return this.renderLastItem();

    const {description, date, isVideo} = media;
    return (
      <View style={styles.itemContainer}>
        {isVideo ? this.renderVideo() : this.renderImage()}
        <View style={styles.textContainer}>
          <View style={styles.textBlockView}>
            <Text>Data: </Text>
            <Text>{moment(date).format('DD/MM/YYYY')}</Text>
          </View>
          <View style={{...styles.textBlockView, flexDirection: 'column'}}>
            <TextInput
              value={description}
              onChangeText={onChangeDescription}
              style={styles.inputStyle}
              multiline
              placeholder="Descrição"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textBlockView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    padding: 5,
  },
  inputStyle: {
    minHeight: 45,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    width: '100%',
  },
  itemContainer: {
    margin: 40,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'floralwhite',
    borderRadius: 25,
  },
  itemMedia: {
    borderRadius: 25,
    alignSelf: 'stretch',
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
  textContainer: {
    alignSelf: 'stretch',
    padding: 10,
    justifyContent: 'flex-start',
  },
});
