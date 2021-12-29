import React, { Component } from 'react';
import { View } from 'react-native';

class FieldSeparator extends Component {

  render() {
    return (
      <View style={{ height: 5, width: 10, backgroundColor: 'white', marginRight: 37, zIndex: 100 }} />
    );
  }
}
export { FieldSeparator };
