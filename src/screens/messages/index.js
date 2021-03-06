import React, { Component } from 'react';
import { 
  TextInput,
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
  ListView,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { 
  getMessages,
  sendMessage
} from '../../api'
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
    message: ''
  };

  render () {
    if (this.state.isLoading) {
      return <AppLoading />
    }

    return (
      <View 
        style = {styles.messagesContainer}
      >
        <View style = {styles.messageList}>
          <ListView 
            style = {styles.listView}
            dataSource = { this.dataSourceWrapper(this.state.messages) }
            renderRow = { this.renderRow }
          />
        </View>

        <KeyboardAvoidingView 
          style = {styles.messageBox} 
          behavior = "padding"
          keyboardVerticalOffset = {-80}
        >
          <TextInput
            style = {styles.messageInput}
            value = {this.state.message}
            onChangeText = {(message) => this.setState({message: message})}
            returnKeyType = 'send'
            disableFullScreenUI = {true}
          />
          <TouchableHighlight
            style = {styles.sendButton}
            onPress = {this.sendMessage.bind(this, this.props.route.params.id)}
          >
            <Text style={styles.send}>SEND</Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      </View>
    )
  }

  renderRow (message) {
    // I know I can use a class selector helper to change the class vs render components
    // this way however I didn't want to do another npm install for styling. 
    if (message.direction === 'inbound') {
      return (
        <Text style = {styles.inboundMessage}>{message.body}</Text>
      )
    } else {
      return (
        <Text style = {styles.outboundMessage}>{message.body}</Text>
      )
    }
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
        messages: messages.data.reverse(),
      })
    } catch (e) {
      console.error(e)
    }
  }

  async sendMessage (contactId) {
    try {
      await sendMessage([`contact-${contactId}`], this.state.message)
      const messages = await getMessages(this.props.route.params)
      this.setState({
        messages: messages.data.reverse(),
        message: ''
      })
    } catch (e) {
      console.error(e)
    }
  }
}

const styles = StyleSheet.create({
  listView: {
    flex: 1
  },
  inboundMessage: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    backgroundColor: 'lightblue',
    textAlign: 'left'
  },
  outboundMessage: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    backgroundColor: 'lightgreen',
    textAlign: 'right'
  },
  separator: {
    backgroundColor: 'lightgray',
    height: 1
  },
  messageList: {
    flex: 9,
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  messagesContainer: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column'
  },
  messageBox: {
    flex: 1,
    justifyContent: 'flex-end',
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
