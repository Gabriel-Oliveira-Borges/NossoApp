import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Share,
  ToastAndroid,
} from 'react-native';
import {AddToRedux} from '../../utils/data/AddToRedux';
import MediaWithText from '../../components/MediaWithText';
import {ScrollView} from 'react-native-gesture-handler';
import LoadingComponent from '../../components/LoadingComponent';
import BackgroundComponent from '../../components/BackgroundComponent';
import FloatingButton from '../../components/FloatingButton';
import ImagePickerHandler from '../../utils/medias/ImagePickerHandler';
import Backend from '../../connection/Backend';
import {downloadMedia} from '../../utils/general';

class MediaScreen extends React.Component {
  constructor(props) {
    super(props);

    this.renderMedias = this.renderMedias.bind(this);
    this.handleAddMedia = this.handleAddMedia.bind(this);
    this.handleOnCameraPress = this.handleOnCameraPress.bind(this);
    this.handleOnFilesPress = this.handleOnFilesPress.bind(this);
    this.handleOnLinkPress = this.handleOnLinkPress.bind(this);
    this.handleEditMedia = this.handleEditMedia.bind(this);
    this.handleDeleteMedia = this.handleDeleteMedia.bind(this);
    this.handleSeeMedia = this.handleSeeMedia.bind(this);
    this.handleShareMedia = this.handleShareMedia.bind(this);
    this.handleDownloadMedia = this.handleDownloadMedia.bind(this);
  }

  componentWillMount() {
    AddToRedux.getAllMedias();
  }

  async handleAddMedia(medias) {
    if (medias?.length > 0) {
      this.props.navigation.navigate('AddMediasScreen', {
        medias: medias,
      });
    }
  }

  handleShareMedia(media) {
    Share.share(
      {
        message: media.uri,
        url: media.uri,
      },
      {dialogTitle: 'Compartilhar'},
    );
  }

  handleSeeMedia(media) {
    this.props.navigation.navigate('SeeMediaScreen', {media});
  }

  async handleDownloadMedia(media) {
    try {
      const filePath = await downloadMedia(media);
      console.log(filePath);
      let message = media.isVideo ? 'Vídeo baixado' : 'Imagem baixada';
      ToastAndroid.show(message, 1000);
    } catch (e) {
      console.log(e);
      ToastAndroid.show('Ocorreu um erro', 1000);
    }
  }

  async handleOnCameraPress() {
    const media = [await ImagePickerHandler.openCamera()];

    if (media[0]) {
      this.handleAddMedia(media);
    }
  }

  async handleOnFilesPress() {
    const medias = await ImagePickerHandler.mediaPicker();
    this.handleAddMedia(medias);
  }

  async handleDeleteMedia(media) {
    Backend.deleteMedia(media);
  }

  handleEditMedia(media) {
    media.edit = true;
    this.props.navigation.navigate('AddMediasScreen', {
      medias: [media],
      edit: true,
    });
  }

  handleOnLinkPress() {
    const media = [
      {
        isFromLink: true,
        uri: '',
      },
    ];
    this.handleAddMedia(media);
  }

  renderLoading = () => <LoadingComponent />;

  renderNoData = () => (
    <View style={styles.messageView}>
      <Text style={{color: 'white'}}>Eita bebê, não tem nenhuma foto aqui</Text>
      <Text style={{color: 'white'}}>Vamos adicionar algumas ?</Text>
    </View>
  );

  renderMedias = () => {
    const {data} = this.props;
    return (
      <ScrollView style={styles.container}>
        {data.map((media, i) => (
          <View key={i} style={{padding: 20}}>
            <MediaWithText
              media={media}
              navigation={this.props.navigation}
              onEditMedia={this.handleEditMedia}
              onDeleteMedia={this.handleDeleteMedia}
              onSeeMedia={this.handleSeeMedia}
              onDownloadMedia={this.handleDownloadMedia}
              onShareMedia={this.handleShareMedia}
            />
          </View>
        ))}
      </ScrollView>
    );
  };

  render() {
    const {loading, data} = this.props;

    if (loading) return this.renderLoading();

    return (
      <SafeAreaView style={styles.container}>
        <BackgroundComponent>
          {!data ? this.renderNoData() : this.renderMedias()}
          <FloatingButton
            onCameraPress={this.handleOnCameraPress}
            onFilesPress={this.handleOnFilesPress}
            onLinkPress={this.handleOnLinkPress}
          />
        </BackgroundComponent>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  loading: state.medias.loading,
  data: state.medias.data,
});

export default connect(mapStateToProps)(MediaScreen);
