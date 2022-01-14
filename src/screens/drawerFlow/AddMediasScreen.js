import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Backend from '../../connection/Backend';
import LoadingScreen from '../../components/LoadingComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackgroundComponent from '../../components/BackgroundComponent';
import AddMediaItem from '../../components/AddMediaItem';
import {filePathToDate} from '../../utils/general';

class AddMediasScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      medias: undefined,
      activeSlideIndex: 0,
      loading: true,
      loadingItem: false,
    };

    this.handleMediasUpload = this.handleMediasUpload.bind(this);
    this.prepareInicialState = this.prepareInicialState.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeUri = this.onChangeUri.bind(this);
    this.onSetMediaType = this.onSetMediaType.bind(this);
    this.changeItemState = this.changeItemState.bind(this);
  }

  componentWillMount() {
    this.prepareInicialState();
  }

  changeItemState(field, value) {
    const {activeSlideIndex, medias} = this.state;
    const currentMedia = medias[activeSlideIndex];
    currentMedia[field] = value;
    medias[activeSlideIndex] = currentMedia;
    this.setState({medias: medias});
  }

  onChangeDate(selectedDate) {
    this.changeItemState('date', selectedDate);
  }

  onChangeDescription(text) {
    this.changeItemState('description', text);
  }

  onChangeUri(uri) {
    this.changeItemState('uri', uri);
  }

  onChangeSecretCategory = (selected, categoryId) => {
    const {activeSlideIndex, medias} = this.state;
    const currentMedia = medias[activeSlideIndex];
    let currentMediaSecretIds = currentMedia.secretIds || [];

    if (selected == true) {
      currentMediaSecretIds.push(categoryId);
    } else {
      currentMediaSecretIds = currentMediaSecretIds.filter(
        (it) => it !== categoryId,
      );
    }

    this.changeItemState('secretIds', currentMediaSecretIds);
  };

  onSetMediaType(isVideo) {
    this.changeItemState('isVideo', isVideo);
  }

  handleMediasUpload() {
    const {medias} = this.state;
    const {edit} = this.props.route.params;
    medias.pop(); // remove a última tela que é a de upload
    if (edit) {
      Backend.EditMedia(medias);
    } else {
      Backend.uploadMedias(medias);
    }
    this.props.navigation.goBack();
  }

  prepareInicialState() {
    const {medias} = this.props.route.params;
    const newMedias = medias.map((media) => ({
      secretIds: [],
      description: '',
      date: filePathToDate(media.path),
      isVideo: media.isFromLink ? false : media.mime?.indexOf('video') !== -1,
      ...media,
    }));

    newMedias.push({});

    this.setState({medias: newMedias, loading: false});
  }

  renderPagination = () => {
    const {activeSlideIndex, medias} = this.state;

    return (
      <Pagination
        dotsLength={medias.length}
        activeDotIndex={activeSlideIndex}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 5,
          backgroundColor: 'rgba(255, 250, 240, 0.85)',
        }}
        tappableDots={true}
        carouselRef={this._carousel}
      />
    );
  };

  render() {
    const {medias, loading, activeSlideIndex, loadingItem} = this.state;
    const {edit} = this.props.route.params;
    if (loading) {
      return <LoadingScreen />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <BackgroundComponent>
          <Carousel
            shouldOptimizeUpdates
            ref={(c) => {
              this._carousel = c;
            }}
            data={medias}
            sliderWidth={Math.round(Dimensions.get('window').width)}
            itemWidth={Math.round(Dimensions.get('window').width)}
            onSnapToItem={(index) =>
              this.setState({
                activeSlideIndex: index,
                loadingItem: false,
              })
            }
            onBeforeSnapToItem={() => this.setState({loadingItem: true})}
            renderItem={(currentMedia) => (
              <AddMediaItem
                loading={loadingItem}
                media={medias[activeSlideIndex]}
                isLastItem={currentMedia.index === medias.length - 1}
                handleMediasUpload={this.handleMediasUpload}
                onChangeDescription={this.onChangeDescription}
                onChangeDate={this.onChangeDate}
                onChangeUri={this.onChangeUri}
                onChangeSecretCategory={this.onChangeSecretCategory}
                onSetMediaType={this.onSetMediaType}
                edit={edit}
              />
            )}
          />
          {this.renderPagination()}
        </BackgroundComponent>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AddMediasScreen;
