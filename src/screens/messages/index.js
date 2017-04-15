import React, { Component } from 'react';
import { 
  Text,
} from 'react-native';

export default class Messages extends Component {
  static route = {
    navigationBar: {
      title: 'Messages'
    }
  };

  render () {
    return (
      <Text>{ this.props.route.params.name }</Text>
    )
  }
}


