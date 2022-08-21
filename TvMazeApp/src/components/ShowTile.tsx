import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {useStore} from '../Store'
import {screens} from '../App'

const loadingIndicator = require('../assets/cupertino_activity_indicator.gif')

export default function ShowTile({showInfo}) {
  const navigationRef = useStore(state => state.navigationRef)
  const setShowOfInterest = useStore(state => state.setShowOfInterest)

  function handlePress() {
    setShowOfInterest(showInfo)
    navigationRef.navigate(screens.ShowDetails)
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <>
        <Image
          style={styles.image}
          source={{uri: showInfo?.image?.medium}}
          resizeMethod={'scale'}
          loadingIndicatorSource={loadingIndicator}
        />
        <Text style={styles.h1}>{showInfo.name}</Text>
      </>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 210,
    margin: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  h1: {
    color: 'white',
  },
})
