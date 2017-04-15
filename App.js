import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddressBook from './src/screens/address_book'
import { 
  AppLoading,
  Contacts,
} from 'expo'

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
      <AddressBook contacts = { this.state.contacts }/>
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
