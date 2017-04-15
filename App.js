import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddressBook from './src/screens/address_book'
import { AppLoading } from 'expo'

export default class App extends Component {

  state = {
    isLoading: true,
  };

  render() {
    if (this.state.isLoading) {
      return <AppLoading />
    }

    return (
      <AddressBook />
    );
  }
}
