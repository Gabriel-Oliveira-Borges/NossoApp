import React from 'react';
import {Button, StyleSheet, Text, View, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackgroundComponent from '../../components/BackgroundComponent';
import Backend from '../../connection/Backend';

class AddConfigScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      configName: "",
      showError: false,
    };
  }

  onSaveConfig = async () => {
    try {
      await Backend.addSecretConfig({description: this.state.configName});
      this.props.navigation.pop();
    } catch(e) {
      console.warn("Deu ruim ", e);
    }
  }

  render() {
    const { configName, showError } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <BackgroundComponent>
        <View style={styles.view}>
            <View style={styles.titleView}>
              <Text style={{ textAlign: 'center', fontSize: 23 }}>Adicionar configuração</Text>
            </View>
            <View style={styles.configView}>
              {showError && <Text style={{ color: 'red' }}>Ocorreu um erro</Text>}
              <Text>
                Digite o nome da config
              </Text>
              <TextInput
                value={configName}
                onChangeText={(text) => this.setState({ configName: text })}
                style={styles.inputStyle}
                placeholder="Nome da config"
              />
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Cancelar"
                onPress={() => this.props.navigation.pop()}
              />
              <Button
                disabled={!configName}
                title="Salvar"
                onPress={this.onSaveConfig}
              />
            </View>
          </View>
        </BackgroundComponent>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: 'row',
    marginTop: 10,
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },
  configView: {
    flex: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  inputStyle: {
    margin: 10,
    minHeight: 45,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    width: '90%',
  },
  view: {
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'floralwhite',
    borderRadius: 25,
  },
  titleView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});

export default AddConfigScreen;
