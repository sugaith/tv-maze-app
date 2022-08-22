import React from 'react'
import {Image, View} from 'react-native'
import SearchBox from './SearchBox'
import {styles} from './styles/HeaderStyle'
import {resizeMode} from '../Utils'

const tvmLogo = require('../assets/tvm-header-logo.png')

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={tvmLogo}
          resizeMode={resizeMode.contain}
        />
      </View>
      <SearchBox />
    </View>
  )
}
