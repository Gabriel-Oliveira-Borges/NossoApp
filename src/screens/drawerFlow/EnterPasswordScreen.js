import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackgroundComponent from '../../components/BackgroundComponent';
import { setHasPasswordBeenEntered } from '../../redux/actions/secretsActions';


class EnterPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      showWrongPasswordError: false,
    };
  }

  navigateToSecretSettingsScreen = () => {
    this.props.navigation.pop();
    this.props.navigation.navigate("SecretSettingsScreen");
  }

  UNSAFE_componentWillMount() {
    const { hasPasswordBeenEntered } = this.props;
    if (hasPasswordBeenEntered) {
      this.navigateToSecretSettingsScreen();
    }
  }

  onButtonPress = () => {
    const { password: typedPassword } = this.state;
    const { password: correctPassword } = this.props;

    this.setState({ showWrongPasswordError: false });

    if (typedPassword === correctPassword) {
      this.props.setHasPasswordBeenEntered();
      this.navigateToSecretSettingsScreen();
    } else {
      this.setState({ showWrongPasswordError: true });
    }
  }

  renderWrongPasswordError = () => {
    const { showWrongPasswordError } = this.state;
    return showWrongPasswordError && <Text style={{ color: 'red' }}>Senha incorreta</Text>
  }

  render() {
    const { password } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <BackgroundComponent>
          <View style={styles.view}>
            <View>
              {this.renderWrongPasswordError()}
            </View>
            <Text>Digite a senha: </Text>
            <TextInput
              value={password}
              onChangeText={(text) => this.setState({ password: text })}
              style={styles.inputStyle}
              multiline
              placeholder="Senha"
            />
            <Button 
              title="Entrar"
              onPress={this.onButtonPress}
            />
          </View>
        </BackgroundComponent>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'floralwhite',
    borderRadius: 25,
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
});

const mapStateToProps = (state) => ({
  password: state.secrets.password,
  hasPasswordBeenEntered: state.secrets.hasPasswordBeenEntered,
});

const mapDispatchToProps = (dispatch) => ({
  setHasPasswordBeenEntered: () => dispatch(setHasPasswordBeenEntered())
});

export default connect(mapStateToProps, mapDispatchToProps)(EnterPasswordScreen);
