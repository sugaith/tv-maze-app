import React from 'react'
import {Image, View} from 'react-native'
import SearchBox from './SearchBox'
import {styles} from './styles/HeaderStyle'

const tvmLogo = require('../assets/tvm-header-logo.png')

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={tvmLogo} />
      </View>
      <SearchBox />
    </View>
  )
}
