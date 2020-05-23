import React from 'react';
import {SafeAreaView, ActivityIndicator, StyleSheet} from 'react-native';

export default class LoadingScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator color="rgba(255, 250, 240, 0.85)" size="large" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rebeccapurple',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
