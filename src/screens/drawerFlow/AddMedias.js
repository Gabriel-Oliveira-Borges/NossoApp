import React from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Backend from '../../connection/Backend';

class AddMedias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };

    this.handleImagesUpload = this.handleImagesUpload.bind(this);
  }

  handleImagesUpload() {
    const {medias} = this.props.route.params;
    Backend.uploadMedias(medias);
  }

  render() {
    const {medias} = this.props.route.params;
    console.log(medias);
    return (
      <View>
        <Text>Tela de adição de medias</Text>
        <TouchableOpacity onPress={this.handleImagesUpload}>
          <Text>Clica aqui</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  teste: state.medias.loading,
});

export default connect(mapStateToProps)(AddMedias);
