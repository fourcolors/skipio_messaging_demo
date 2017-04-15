import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddressBook from './src/screens/address_book'
import { 
  AppLoading,
  Contacts,
} from 'expo'
import {
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation'

import { Router } from './src/navigation/router.js'


export default class App extends Component {
  state = {
    isLoading: true,
    contacts: [],
  };

  componentWillMount () {
    this.loadContacts()
  }

  render () {
    if (this.state.isLoading) {
      return <AppLoading />
    }

    return (
      <NavigationProvider router = {Router}>
        <StackNavigation initialRoute = { Router.getRoute('addressBook', this.state.contacts) } />
      </NavigationProvider>
    );
  }

  async loadContacts () {
    const contacts = await Contacts.getContactsAsync([
      Contacts.PHONE_NUMBERS,
    ])

    if (contacts.length > 0) {
      this.setState({
        isLoading: false,
        contacts: contacts,
      })
    }
  }
}
