import React, { Component } from 'react';
import { 
  TextInput,
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
} from 'react-native';

export default class Messages extends Component {
  static route = {
    navigationBar: {
      title: 'Messages'
    }
  };

  render () {
    return (
      <View style = {styles.messagesContainer}>
        <View style = {styles.messageList}>
          <Text>Chats go here</Text>
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
