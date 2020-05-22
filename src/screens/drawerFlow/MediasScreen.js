import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {AddToRedux} from '../../utils/data/AddToRedux';
import ImageWithText from '../../components/ImageWithText';
import {ScrollView} from 'react-native-gesture-handler';

class MediaScreen extends React.Component {
  constructor(props) {
    super(props);

    this.renderMedias = this.renderMedias.bind(this);
  }

  componentWillMount() {
    AddToRedux.getAllMedias();
  }

  renderLoading = () => (
    <View style={styles.messageView}>
      <ActivityIndicator color="rgba(0, 0, 0, 0.85)" size="large" />
    </View>
  );

  renderNoData = () => (
    <View style={styles.messageView}>
      <Text>Eita bebê, não tem nenhuma foto aqui</Text>
      <Text>Vamos adicionar algumas ?</Text>
    </View>
  );

  renderMedias = () => {
    const {data} = this.props;
    return (
      <ScrollView style={styles.container}>
        {data.map((item) => (
          <View style={{padding: 20}}>
            <ImageWithText item={item} />
          </View>
        ))}
      </ScrollView>
    );
  };

  render() {
    // ver esses estilos:
    // A imagem do café é interessante (em HOME) https://demos.creative-tim.com/material-kit-react-native/index.html#cards
    // Eu posso pegar esse estilo do Elements https://demos.creative-tim.com/argon-react-native/?_ga=2.115459524.334557525.1589952715-1038485479.1587607471
    // e também a imagem para o article (combinando com a imagem do café)
    const {loading, data} = this.props;
    console.log(this.props);
    return (
      <SafeAreaView style={styles.container}>
        {loading && this.renderLoading()}
        {!loading && !data && this.renderNoData()}
        {!loading && data && this.renderMedias()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEEEEE',
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
