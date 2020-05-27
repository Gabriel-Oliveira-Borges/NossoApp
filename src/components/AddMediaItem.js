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

export default class AddMediaItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVideoPaused: false,
      shouldShowVideoStatusIcon: true,
      shouldShowModal: true,
    };

    setTimeout(() => this.setState({shouldShowVideoStatusIcon: false}), 2000);
    this.setShouldShowVideoStatusIcon = this.setShouldShowVideoStatusIcon.bind(
      this,
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.media?.isVideo && this.state.isVideoPaused) {
      this.setState({
        isVideoPaused: false,
        shouldShowVideoStatusIcon: true,
      });
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
    const {shouldShowModal} = this.state;
    return (
      <Image
        resizeMode="cover"
        style={
          shouldShowModal ? styles.itemMediaWithModalOpen : styles.itemMedia
        }
        source={{uri: path}}
      />
    );
  }

  renderVideo() {
    const {path} = this.props.media;
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
          <Text onPress={() => this.setState({shouldShowModal: false})}>
            {moment(date).format('DD/MM/YYYY')}
          </Text>
        </View>
      </Modal>
    );
  };

  render() {
    const {isLastItem, media, onChangeDescription, loading} = this.props;
    const {shouldShowModal} = this.state;
    if (loading) return this.renderLoading();

    if (isLastItem || !media) return this.renderLastItem();

    const {description, date, isVideo} = media;
    return (
      <View
        style={
          shouldShowModal
            ? styles.itemContainerWithModalOpen
            : styles.itemContainer
        }>
        {isVideo ? this.renderVideo() : this.renderImage()}
        <View style={styles.textContainer}>
          <View style={styles.textBlockView}>
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
  textBlockView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    padding: 5,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'floralwhite',
    height: 350,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: 25,
    alignSelf: 'stretch',
    flex: 1,
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
