import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
} from 'react-native';
import { Router } from '../../navigation/router.js'

export default class AddressBook extends Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
  }
  static route = {
    navigationBar: {
      title: 'Address Book'
    }
  };

  render() {
    return (
      <ListView 
        dataSource = { this.dataSourceWrapper(this.props.route.params) }
        renderRow = { this.renderRow }
        renderSeparator = { this.renderSeparator }
      />
    );
  }

  renderRow (contact) {
    return (
      <TouchableHighlight onPress = {() => this.props.navigator.push(Router.getRoute('messages', contact))} >
        <Text style = {styles.contactName}>{ contact.name }</Text>
      </TouchableHighlight>
    )
  }

  renderSeparator (sectionID, rowID) {
    return (
      <View 
        style = {styles.separator}
        key = {`${sectionID}-${rowID}`}
      />
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
    fontSize: 23,
    backgroundColor: 'white'
  }
});
