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
        renderSeparator = { this.renderSeparator }
      />
    );
  }

  renderRow (contact) {
    return (
      <Text style = {styles.contactName}>{ contact.name }</Text>
    )
  }

  renderSeparator () {
    return (
      <View style = {styles.separator} />
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
  separator: {
    backgroundColor: 'lightgray',
    height: 1
  },
  contactName: {
    padding: 10,
    fontSize: 23
  }
});
