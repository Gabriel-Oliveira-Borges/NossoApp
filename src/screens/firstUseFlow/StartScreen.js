import React from 'react';
import {StyleSheet, Dimensions, Button} from 'react-native';
import {ChangeStackHandler} from '../../utils/navigation/ChangeStackHandler';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {SafeAreaView} from 'react-native-safe-area-context';
import FirstUseItem from '../../components/FirstUseItem';
import {connect} from 'react-redux';
import {
  setFirstUseData,
  setFirstUseLoading,
} from '../../redux/actions/firstUseActions';

class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          url:
            'https://static.poder360.com.br/2020/04/tigre-olhando-com-a-boca-aberta-626x644.jpg',
          text: 'Esse é o tigrão',
        },
        {
          url:
            'https://media-manager.noticiasaominuto.com/1920/naom_59da6d8da5cb5.jpg',
          text: 'Esse é o tigrão branco',
        },
        {
          url:
            'https://www.infoescola.com/wp-content/uploads/2017/04/leao-126767138.jpg',
          text: 'Esse é o leão',
        },
        {
          url:
            'https://pm1.narvii.com/6593/9852c5a4f61d970d175d5ac3a98673ff333d93c5_00.jpg',
          text: 'Esse é o leão branco',
        },
      ],
      activeSlideIndex: 0,
    };
  }

  renderPagination = () => {
    const {data, activeSlideIndex} = this.state;

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
      />
    );
  };

  render() {
    const {data} = this.state;
    console.log(this.props);
    return (
      <SafeAreaView style={styles.container}>
        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={this.state.data}
          renderItem={(currentItem) => (
            <FirstUseItem
              currentItem={currentItem}
              isLastItem={currentItem.index === data.length - 1}
            />
          )}
          sliderWidth={Math.round(Dimensions.get('window').width)}
          itemWidth={Math.round(Dimensions.get('window').width)}
          onSnapToItem={(index) => this.setState({activeSlideIndex: index})}
        />
        {this.renderPagination()}
        <Button
          title="Primeiro uso. Mudar"
          onPress={() => this.props.setData(!this.props.data)}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rebeccapurple',
  },
});

const mapStateToProps = (state) => ({
  loading: state.firstUse.loading,
  data: state.firstUse.data,
});

// Tirar esse cara daqui e botar no mapper, dps de pegar os dados do firebase
const mapDispatchToProps = (dispatch) => ({
  setLoading: (loading) => dispatch(setFirstUseLoading(loading)),
  setData: (data) => dispatch(setFirstUseData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);
