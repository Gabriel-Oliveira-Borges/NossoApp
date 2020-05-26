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
    this.handleOnAddMediaClick = this.handleOnAddMediaClick.bind(this);
  }

  componentWillMount() {
    AddToRedux.getAllMedias();
  }

  async handleOnAddMediaClick() {
    const result = await ImagePickerHandler.mediaPicker();
    if (result?.length > 0) {
      this.props.navigation.navigate('AddMediasScreen', {medias: result});
    }
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

    if (loading) return this.renderLoading();

    return (
      <SafeAreaView style={styles.container}>
        <BackgroundComponent>
          {!data ? this.renderNoData() : this.renderMedias()}
          <FloatingButton onPress={this.handleOnAddMediaClick} />
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
