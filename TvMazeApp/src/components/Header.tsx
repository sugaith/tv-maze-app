import React from 'react';
import {Image, View} from 'react-native';
const tvmLogo = require('../assets/tvm-header-logo.png');

export default function Header() {
  function render() {
    return (
      <View
        style={{
          backgroundColor: 'black',
          height: 90,
        }}>
        <Image source={tvmLogo} />
      </View>
    );
  }

  return render();
}
