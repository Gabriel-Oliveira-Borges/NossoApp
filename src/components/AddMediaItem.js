import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import Video from 'react-native-video';
import LoadingScreen from './LoadingComponent';
import playIcon from '../assets/images/play.png';
import pauseIcon from '../assets/images/pause.png';

export default class AddMediaItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVideoPaused: false,
      shouldShowVideoStatusIcon: true,
    };

    setTimeout(() => this.setState({shouldShowVideoStatusIcon: false}), 2000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.media?.isVideo && this.state.isVideoPaused) {
      this.setState({isVideoPaused: false, shouldShowVideoStatusIcon: true});
    }
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
    const {isVideoPaused, shouldShowVideoStatusIcon} = this.state;
    return (
      <TouchableOpacity
        style={styles.itemMedia}
        onPress={() =>
          this.setState(
            {
              isVideoPaused: !isVideoPaused,
              shouldShowVideoStatusIcon: true,
            },
            () =>
              setTimeout(
                () => this.setState({shouldShowVideoStatusIcon: false}),
                2000,
              ),
          )
        }>
        <Video
          style={{width: '100%', height: '100%'}}
          ref={(ref) => {
            this.player = ref;
          }}
          source={{uri: path}}
          paused={isVideoPaused}
          controls={false}
          bufferConfig={{
            maxBufferMs: 2500,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000,
          }}
          resizeMode="contain"
          disableFocus={true}
        />
        {shouldShowVideoStatusIcon && (
          <Image
            source={isVideoPaused ? pauseIcon : playIcon}
            style={{
              height: 25,
              width: 25,
              position: 'absolute',
              top: 20,
              left: 20,
            }}
          />
        )}
      </TouchableOpacity>
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
            <Text style={{textDecorationLine: 'underline'}}>
              {moment(date).format('DD/MM/YYYY')}
            </Text>
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
