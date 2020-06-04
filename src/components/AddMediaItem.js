import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import moment from 'moment';
import Video from 'react-native-video';
import LoadingScreen from './LoadingComponent';
import playIcon from '../assets/images/play.png';
import pauseIcon from '../assets/images/pause.png';
import CalendarPicker from './ CalendarPicker';
import {Switch} from 'react-native-gesture-handler';
import SwipeArrow from '../assets/images/SwipeArrow.png';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default class AddMediaItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVideoPaused: false,
      shouldShowVideoStatusIcon: true,
      shouldShowModal: false,
    };

    setTimeout(() => this.setState({shouldShowVideoStatusIcon: false}), 2000);
    this.setShouldShowVideoStatusIcon = this.setShouldShowVideoStatusIcon.bind(
      this,
    );

    this.handleVideoSelection = this.handleVideoSelection.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.media?.isVideo && this.state.isVideoPaused) {
      this.setState({
        isVideoPaused: false,
        shouldShowVideoStatusIcon: true,
      });
    }
  }

  handleVideoSelection(isVideo) {
    const {onSetMediaType, media} = this.props;
    onSetMediaType(isVideo);
    if (isVideo && media.uri?.lenght > 0) {
      this.setState({isVideoPaused: false});
      this.setShouldShowVideoStatusIcon(true);
    } else if (!isVideo) {
      this.setState({shouldShowVideoStatusIcon: false, isVideoPaused: true});
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

  renderLastItem() {
    const {handleMediasUpload, edit} = this.props;
    return (
      <View style={{...styles.itemContainer, backgroundColor: 'transparent'}}>
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
              <Text>{edit ? 'Editar' : 'Adicionar'}</Text>
            </View>
          )}
          onSwipeableLeftOpen={handleMediasUpload}>
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
              }}>{`Deslise para ${edit ? 'editar' : 'adicionar'}`}</Text>
          </View>
        </Swipeable>
      </View>
    );
  }

  renderImage() {
    const {path, uri, isFromLink, edit} = this.props.media;
    const {shouldShowModal} = this.state;
    return (
      <Image
        resizeMode="contain"
        style={
          shouldShowModal ? styles.itemMediaWithModalOpen : styles.itemMedia
        }
        source={{uri: isFromLink || edit ? uri : path}}
      />
    );
  }

  renderVideo() {
    const {path, uri, isFromLink, edit} = this.props.media;
    const {
      isVideoPaused,
      shouldShowVideoStatusIcon,
      shouldShowModal,
    } = this.state;
    return (
      <TouchableOpacity
        style={
          shouldShowModal ? styles.itemMediaWithModalOpen : styles.itemMedia
        }
        onPress={() => {
          this.setState({
            isVideoPaused: !isVideoPaused,
            shouldShowVideoStatusIcon: true,
          });
          this.setShouldShowVideoStatusIcon(true);
        }}>
        <Video
          style={shouldShowModal ? styles.videoWithModal : styles.video}
          ref={(ref) => {
            this.player = ref;
          }}
          source={{uri: isFromLink || edit ? uri : path}}
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

  renderModal = () => {
    const {date} = this.props.media;
    const {shouldShowModal} = this.state;
    return (
      <Modal
        visible={shouldShowModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => this.setState({shouldShowModal: false})}>
        <View style={styles.modalView}>
          <Text>Selecione o dia</Text>
          <CalendarPicker
            selectedDate={date}
            onDayPress={(selectedDate) => {
              this.setState({shouldShowModal: false});
              this.props.onChangeDate(selectedDate);
            }}
            height={325}
            width={325}
          />
        </View>
      </Modal>
    );
  };

  renderLinkInput() {
    const {onChangeUri, media} = this.props;
    const {uri} = media;
    return (
      <View
        style={{
          ...styles.textBlockView,
          flexDirection: 'column',
        }}>
        <TextInput
          value={uri}
          onChangeText={onChangeUri}
          style={styles.inputStyle}
          placeholder="Link"
        />
      </View>
    );
  }

  renderVideoOrImageSelector() {
    const {media} = this.props;
    const {isVideo} = media;
    return (
      <View style={styles.textBlockView}>
        <Text>Imagem</Text>
        <Switch value={isVideo} onValueChange={this.handleVideoSelection} />
        <Text>Vídeo</Text>
      </View>
    );
  }

  render() {
    const {isLastItem, media, onChangeDescription, loading} = this.props;
    const {shouldShowModal} = this.state;
    if (loading) return this.renderLoading();

    if (isLastItem || !media) return this.renderLastItem();

    const {description, date, isVideo, isFromLink} = media;

    return (
      <View
        style={
          shouldShowModal
            ? styles.itemContainerWithModalOpen
            : styles.itemContainer
        }>
        {isVideo ? this.renderVideo() : this.renderImage()}
        <View style={styles.textContainer}>
          <View
            style={{
              ...styles.textBlockView,
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text>Data: </Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    shouldShowModal: true,
                    isVideoPaused: true,
                  });
                  this.setShouldShowVideoStatusIcon(true);
                }}>
                <Text style={{textDecorationLine: 'underline'}}>
                  {moment(date).format('DD/MM/YYYY')}
                </Text>
              </TouchableOpacity>
            </View>
            {isFromLink && this.renderVideoOrImageSelector()}
          </View>
          {isFromLink && this.renderLinkInput()}
          <View
            style={{
              ...styles.textBlockView,
              flexDirection: 'column',
            }}>
            <TextInput
              value={description}
              onChangeText={onChangeDescription}
              style={styles.inputStyle}
              multiline
              placeholder="Descrição"
            />
          </View>
        </View>
        {this.renderModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: 'floralwhite',
    height: 350,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 150,
    marginBottom: 150,
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
  itemContainerWithModalOpen: {
    margin: 40,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'floralwhite',
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  itemMedia: {
    alignSelf: 'stretch',
    flex: 1,
    borderRadius: 25,
    borderColor: 'rgba(0,0,0,0.4)',
  },
  itemMediaWithModalOpen: {
    opacity: 0.1,
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
  textBlockView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    padding: 5,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  videoWithModal: {
    opacity: 0.1,
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignSelf: 'stretch',
    padding: 10,
    justifyContent: 'flex-start',
  },
});
