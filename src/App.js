import React from 'react';
import {Button, Text, View, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {ChangeStackHandler} from './utils/navigation/ChangeStackHandler';
import {FIRST_USE_STACK} from './utils/navigation/NavigationConst';
import {AddToRedux} from './utils/data/AddToRedux';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    ChangeStackHandler.onAppStarted();
    AddToRedux.getAllMedias();
  }

  renderFirstUse = () => (
    <Button
      title="Primeiro uso. Mudar"
      onPress={ChangeStackHandler.changeToDrawerNavigation}
    />
  );

  renderDrawer = () => {
    const {loading, files} = this.props.medias;
    return (
      <View style={styles.container}>
        {loading ? (
          <Text>Carregando</Text>
        ) : (
          <View>
            {files?.map((file, i) => (
              <Image key={i} source={{uri: file.url}} style={styles.image} />
            ))}
          </View>
        )}
      </View>
    );
  };

  renderLoading = () => <Text>Carregando</Text>;

  render() {
    const {currentStack} = this.props;

    return !currentStack
      ? this.renderLoading()
      : currentStack === FIRST_USE_STACK
      ? this.renderFirstUse()
      : this.renderDrawer();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
});

const mapStateToProps = (state) => ({
  currentStack: state.navigation.currentStack,
  medias: state.medias,
});

export default connect(mapStateToProps)(App);
