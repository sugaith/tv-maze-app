import React from 'react'
import {Image, StyleSheet, View} from 'react-native'
import SearchBox from './SearchBox'

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

const styles = StyleSheet.create({
  container: {
    height: 90,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
  },
})
