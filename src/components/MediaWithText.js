import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {timeStampToString} from '../utils/general';
import Video from 'react-native-video';
import backgroundVideoImage from '../assets/images/playVideoButton.png';

export default class MediaWithText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVideoPaused: true,
      shouldShowVideoImage: true,
    };

    this.renderImage = this.renderImage.bind(this);
    this.renderVideo = this.renderVideo.bind(this);
  }
  renderVideo() {
    const {uri} = this.props.item;
    const {isVideoPaused, shouldShowVideoImage} = this.state;
    return (
      <TouchableOpacity
        onPress={() =>
          this.setState({
            isVideoPaused: !isVideoPaused,
            shouldShowVideoImage: false,
          })
        }>
        {shouldShowVideoImage ? (
          <Image
            resizeMode="center"
            style={styles.media}
            source={backgroundVideoImage}
          />
        ) : (
          <Video
            ref={(ref) => {
              this.player = ref;
            }}
            style={styles.media}
            source={{uri: uri}}
            paused={isVideoPaused}
            controls={true}
            bufferConfig={{
              maxBufferMs: 2500,
              bufferForPlaybackMs: 2500,
              bufferForPlaybackAfterRebufferMs: 5000,
            }}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
    );
  }
  renderImage() {
    const {uri} = this.props.item;
    return (
      <Image resizeMode="contain" style={styles.media} source={{uri: uri}} />
    );
  }

  render() {
    const {date, description, uri, isVideo} = this.props.item;

    return (
      <View style={styles.container}>
        {isVideo ? this.renderVideo() : this.renderImage()}
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
  media: {
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
