import React, { Component } from 'react';
import { 
  TextInput,
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
  ListView,
} from 'react-native';
import { getMessages } from '../../api'
import { 
  AppLoading,
} from 'expo'

export default class Messages extends Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.loadMessages(props.route.params)
  }

  static route = {
    navigationBar: {
      title: 'Messages'
    }
  };

  state = {
    isLoading: true,
    messages: [],
  };

  render () {
    if (this.state.isLoading) {
      return <AppLoading />
    }

    return (
      <View style = {styles.messagesContainer}>
        <View style = {styles.messageList}>
          <ListView 
            dataSource = { this.dataSourceWrapper(this.state.messages) }
            renderRow = { this.renderRow }
            renderSeparator = { this.renderSeparator }
          />
        </View>

        <View style = {styles.messageBox} >
          <TextInput
            style = {styles.messageInput}
            value = ""
            returnKeyType = 'send'
            disableFullScreenUI = {true}
          />
          <TouchableHighlight
            style = {styles.sendButton}
          >
            <Text style={styles.send}>SEND</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  renderRow (message) {
    return (
      <Text>
        {message.body}
      </Text>
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

  dataSourceWrapper (messages = []) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(messages)
  }

  async loadMessages (contact) {
    try {
      const messages = await getMessages(contact)
      this.setState({
        isLoading: false,
        messages: messages.data,
      })
    } catch (e) {
      console.error(e)
    }
  }
}

const styles = StyleSheet.create({
  messageList: {
    flex: 9
  },
  messagesContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  messageBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#7053AB',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  messageInput: {
    flex: 8,
    backgroundColor: 'white',
    height: 40
  },
  sendButton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  send: {
    color: 'white'
  }
});
