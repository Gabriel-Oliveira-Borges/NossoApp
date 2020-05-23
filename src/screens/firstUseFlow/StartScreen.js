import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {SafeAreaView} from 'react-native-safe-area-context';
import FirstUseItem from '../../components/FirstUseItem';
import {connect} from 'react-redux';
import {AddToRedux} from '../../utils/data/AddToRedux';
import LoadingComponent from '../../components/LoadingComponent';
import BackgroundComponent from '../../components/BackgroundComponent';

class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlideIndex: 0,
    };

    this.renderCarousel = this.renderCarousel.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
  }

  componentWillMount() {
    AddToRedux.getFirstUseData();
  }

  renderPagination = () => {
    const {activeSlideIndex} = this.state;
    const {data} = this.props;
    return (
      <Pagination
        dotsLength={data.length}
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

  renderLoading = () => <LoadingComponent />;

  renderCarousel = () => {
    const {data} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <BackgroundComponent>
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            data={data}
            sliderWidth={Math.round(Dimensions.get('window').width)}
            itemWidth={Math.round(Dimensions.get('window').width)}
            onSnapToItem={(index) => this.setState({activeSlideIndex: index})}
            renderItem={(currentItem) => (
              <FirstUseItem
                currentItem={currentItem}
                isLastItem={currentItem.index === data.length - 1}
              />
            )}
          />
          {this.renderPagination()}
        </BackgroundComponent>
      </SafeAreaView>
    );
  };

  render() {
    const {data, loading} = this.props;

    return loading || !data ? this.renderLoading() : this.renderCarousel();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  loading: state.firstUse.loading,
  data: state.firstUse.data,
});

export default connect(mapStateToProps)(StartScreen);
