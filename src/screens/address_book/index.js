import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class AddressBook extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>AddresBook Here</Text>
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