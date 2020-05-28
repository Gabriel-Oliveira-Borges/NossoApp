import React from 'react';
import {SafeAreaView, StyleSheet, Image} from 'react-native';
import BackgroundComponent from '../../components/BackgroundComponent';
import Video from 'react-native-video';

export default class SeeMediaScreen extends React.Component {
  renderImage() {
    const {media} = this.props.route.params;
    return (
      <Image
        style={styles.media}
        source={{uri: media.uri}}
        resizeMode="contain"
      />
    );
  }

  renderVideo() {
    const {media} = this.props.route.params;
    return (
      <Video
        ref={(ref) => {
          this.player = ref;
        }}
        style={{...styles.media}}
        source={{uri: media.uri}}
        controls={true}
        bufferConfig={{
          maxBufferMs: 2500,
          bufferForPlaybackMs: 2500,
          bufferForPlaybackAfterRebufferMs: 5000,
        }}
        resizeMode="contain"
        disableFocus={true}
      />
    );
  }

  render() {
    const {media} = this.props.route.params;
    return (
      <SafeAreaView style={styles.container}>
        <BackgroundComponent>
          {media.isVideo ? this.renderVideo() : this.renderImage()}
        </BackgroundComponent>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
