import React from 'react';
import {connect} from 'react-redux';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Backend from '../../connection/Backend';
import moment from 'moment';
import LoadingScreen from '../../components/LoadingComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackgroundComponent from '../../components/BackgroundComponent';
import AddMediaItem from '../../components/AddMediaItem';

class AddMedias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      medias: undefined,
      activeSlideIndex: 0,
      loading: true,
    };

    this.handleImagesUpload = this.handleImagesUpload.bind(this);
    this.prepareInicialState = this.prepareInicialState.bind(this);
  }

  componentWillMount() {
    this.prepareInicialState();
  }

  handleImagesUpload() {
    const {medias} = this.state;
    medias.pop(); // remove a última tela que é a de upload
    Backend.uploadMedias(medias);
    this.props.navigation.goBack();
  }

  prepareInicialState() {
    const {medias} = this.props.route.params;
    const newMedias = medias.map((media) => ({
      description: '',
      date: moment(parseInt(media.modificationDate)),
      isVideo: media.mime.indexOf('video') !== -1,
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
    const {medias, loading, activeSlideIndex} = this.state;
    if (loading) return <LoadingScreen />;
    console.log(medias);
    return (
      <SafeAreaView style={styles.container}>
        <BackgroundComponent>
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            data={medias}
            sliderWidth={Math.round(Dimensions.get('window').width)}
            itemWidth={Math.round(Dimensions.get('window').width)}
            onSnapToItem={(index) => this.setState({activeSlideIndex: index})}
            renderItem={(currentMedia) => (
              <AddMediaItem
                media={medias[activeSlideIndex]}
                isLastItem={currentMedia.index === medias.length - 1}
                handleImagesUpload={this.handleImagesUpload}
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

const mapStateToProps = (state) => ({
  teste: state.medias.loading,
});

export default connect(mapStateToProps)(AddMedias);
