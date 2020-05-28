import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {timeStampToString} from '../utils/general';
import Video from 'react-native-video';
import backgroundVideoImage from '../assets/images/playVideoButton.png';
import playIcon from '../assets/images/play.png';
import pauseIcon from '../assets/images/pause.png';
import DialogAndroid from 'react-native-dialogs';
import Backend from '../connection/Backend';

export default class MediaWithText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVideoPaused: true,
      shouldShowVideoImage: true,
      shouldShowVideoStatusIcon: false,
    };

    this.renderImage = this.renderImage.bind(this);
    this.renderVideo = this.renderVideo.bind(this);
    this.showMediaOptions = this.showMediaOptions.bind(this);
    this.handleDeleteMedia = this.handleDeleteMedia.bind(this);
    this.handleShareMedia = this.handleShareMedia.bind(this);
    this.handleSeeMediaDetails = this.handleSeeMediaDetails.bind(this);
    this.setShouldShowVideoStatusIcon = this.setShouldShowVideoStatusIcon.bind(
      this,
    );
  }

  handleSeeMediaDetails() {}

  handleShareMedia() {}

  async handleDeleteMedia() {
    const {media} = this.props;
    let messageTitle;
    if (media.isVideo) {
      messageTitle = 'Deletar vídeo ?';
    } else {
      messageTitle = 'Deletar imagem ?';
    }

    DialogAndroid.assignDefaults({
      positiveText: 'Deletar',
      negativeText: 'Cancelar',
    });
    const {action} = await DialogAndroid.showPicker(messageTitle, null, {});

    if (action === 'actionPositive') {
      this.props.onDeleteMedia(media);
    }
  }

  setShouldShowVideoStatusIcon(newValue) {
    this.setState({shouldShowVideoStatusIcon: newValue}, () =>
      setTimeout(
        () => this.setState({shouldShowVideoStatusIcon: !newValue}),
        2000,
      ),
    );
  }

  async showMediaOptions() {
    const {media} = this.props;
    const {isVideo} = media;
    DialogAndroid.assignDefaults({
      positiveText: '',
      negativeText: 'Cancelar',
    });
    const {selectedItem} = await DialogAndroid.showPicker(
      'Selecione uma opção',
      null,
      {
        items: [
          {
            label: isVideo ? 'Ver video' : 'Ver imagem',
            id: 'details',
          },
          {label: 'Compartilhar', id: 'share'},
          {label: 'Editar', id: 'edit'},
          {label: 'Excluir', id: 'delete'},
        ],
      },
    );

    if (selectedItem?.id === 'details') {
    } else if (selectedItem?.id === 'share') {
      this.handleShareMedia();
    } else if (selectedItem?.id === 'edit') {
      this.props.onEditMedia(media);
    } else if (selectedItem?.id === 'delete') {
      this.handleDeleteMedia();
    }
  }

  renderImage() {
    const {uri} = this.props.media;
    return (
      <Image resizeMode="cover" style={styles.media} source={{uri: uri}} />
    );
  }

  renderVideo() {
    const {uri} = this.props.media;
    const {
      isVideoPaused,
      shouldShowVideoImage,
      shouldShowVideoStatusIcon,
    } = this.state;
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            isVideoPaused: !isVideoPaused,
            shouldShowVideoImage: false,
          });
          this.setShouldShowVideoStatusIcon(true);
        }}
        onLongPress={this.showMediaOptions}>
        {shouldShowVideoImage ? (
          <Image
            resizeMode="center"
            style={styles.media}
            source={backgroundVideoImage}
          />
        ) : (
          <View>
            <Video
              ref={(ref) => {
                this.player = ref;
              }}
              style={styles.media}
              source={{uri: uri}}
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
          </View>
        )}
      </TouchableOpacity>
    );
  }

  render() {
    const {date, description, isVideo} = this.props.media;

    return (
      <TouchableOpacity
        style={styles.container}
        onLongPress={this.showMediaOptions}
        delayLongPress={1500}>
        {isVideo ? this.renderVideo() : this.renderImage()}
        <View style={styles.textsView}>
          {date && (
            <Text style={styles.dateText}>{date.format('DD/MM/YYYY')}</Text>
          )}
          {!!description && <Text>{description}</Text>}
        </View>
      </TouchableOpacity>
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
