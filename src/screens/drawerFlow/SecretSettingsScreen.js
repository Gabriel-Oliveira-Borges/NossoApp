import React from 'react';
import {Button, StyleSheet, Text, Switch, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackgroundComponent from '../../components/BackgroundComponent';
import { setSelectedSecretConfigs } from '../../redux/actions/mediaActions';


class SecretSettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secretsConfigs: [],
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.mapPropsToState(nextProps);
  }

  componentDidMount() {
    this.mapPropsToState(this.props);
  }

  mapPropsToState(props) {
    const { secretsConfigs, selectedSecretsConfigs } = props;
    const actualState = secretsConfigs.map((config) => {
      const previouslySelectedInState = this.state.secretsConfigs.find(it => it.id === config.id)
      const selected = selectedSecretsConfigs.indexOf(config.id) !== -1 || previouslySelectedInState?.selected;
      return {
        ...config,
        selected,
      };
    });
    this.setState({ secretsConfigs: actualState });
  }

  onSaveButtonClick = () => {
    const { secretsConfigs } = this.state;
    const ids = secretsConfigs.filter(it => it.selected).map(it => it.id);
    console.log(ids);
    this.props.setSelectedSecretConfigs(ids);
    this.props.navigation.pop();
  }

  onSwitchChange = (index, selected) => {
    let { secretsConfigs } = this.state;
    secretsConfigs[index].selected = selected;
    this.setState({ secretsConfigs: secretsConfigs });
  }

  renderConfigs = () => {
    const { secretsConfigs } = this.state;

    if (secretsConfigs.length === 0) 
      return <Text>Nenhuma configuração adicionada</Text>;

    return secretsConfigs.map((config, i) => {

      return(
        <View key={i} style={styles.configItem}>
          <Text style={{ alignSelf: 'center' }}>{config.description}</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#7893bf" }}
            thumbColor={config.selected ? "#4b46d4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(selected) => this.onSwitchChange(i, selected)}
            value={config.selected}
        />
      </View>
      )
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <BackgroundComponent>
          <View style={styles.view}>
            <View style={styles.titleView}>
              <Text style={{ textAlign: 'center', fontSize: 23 }}>Configurações</Text>
            </View>
            <View style={styles.configsView}>
              <ScrollView>
                {this.renderConfigs()}
              </ScrollView>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Adicionar config"
                onPress={() => this.props.navigation.navigate("AddConfigScreen")}
              />
              <Button
                title="Salvar"
                onPress={this.onSaveButtonClick}
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
  configItem: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingBottom: 10,
  },
  configsView: {
    flex: 12,
    width: '100%',
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

const mapStateToProps = (state) => ({
  password: state.secrets.password,
  hasPasswordBeenEntered: state.secrets.hasPasswordBeenEntered,
  secretsConfigs: state.secrets.secretsConfigs, 
  selectedSecretsConfigs: state.medias.selectedSecretsConfigs,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedSecretConfigs: (configs) => dispatch(setSelectedSecretConfigs(configs))
});

export default connect(mapStateToProps, mapDispatchToProps)(SecretSettingsScreen);
