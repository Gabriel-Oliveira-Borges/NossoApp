import React from 'react';
import {connect} from 'react-redux';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {AddToRedux} from '../../utils/data/AddToRedux';
import MediaWithText from '../../components/MediaWithText';
import {ScrollView} from 'react-native-gesture-handler';
import LoadingComponent from '../../components/LoadingComponent';
import BackgroundComponent from '../../components/BackgroundComponent';
import FloatingButton from '../../components/FloatingButton';
import ImagePickerHandler from '../../utils/medias/ImagePickerHandler';

class MediaScreen extends React.Component {
  constructor(props) {
    super(props);

    this.renderMedias = this.renderMedias.bind(this);
    this.handleAddMedia = this.handleAddMedia.bind(this);
    this.handleOnCameraPress = this.handleOnCameraPress.bind(this);
    this.handleOnFilesPress = this.handleOnFilesPress.bind(this);
    this.handleOnLinkPress = this.handleOnLinkPress.bind(this);
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
            <MediaWithText media={media} />
          </View>
        ))}
      </ScrollView>
    );
  };

  render() {
    const {loading, data} = this.props;
    console.log(data);
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
