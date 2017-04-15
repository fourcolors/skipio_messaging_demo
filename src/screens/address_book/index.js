import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';

export default class AddressBook extends Component {
  render() {
    return (
      <ListView 
        dataSource = { this.dataSourceWrapper(this.props.contacts) }
        renderRow = { this.renderRow }
      />
    );
  }

  renderRow (contact) {
    return (
      <Text>{ contact.name }</Text>
    )
  }

  dataSourceWrapper (contacts = []) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(contacts)
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
