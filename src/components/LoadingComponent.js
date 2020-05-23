import React from 'react';
import {SafeAreaView, ActivityIndicator, StyleSheet} from 'react-native';
import BackgroundComponent from './BackgroundComponent';

export default class LoadingScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <BackgroundComponent>
          <ActivityIndicator color="rgba(255, 250, 240, 0.85)" size="large" />
        </BackgroundComponent>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
