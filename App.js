import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Bananas from './src/Components/Bananas.js'

export default class App extends React.Component {
  render() {
    return (
        <View style={styles.container}>
        <Bananas />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
