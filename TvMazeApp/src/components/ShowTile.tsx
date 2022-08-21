import React from 'react'
import {Image, Text, TouchableOpacity} from 'react-native'
import {IShow} from '../services/api/types'
import {useStore} from '../Store'
import {screens} from '../App'
import {styles} from './styles/ShowTileStyle'

const loadingIndicator = require('../assets/cupertino_activity_indicator.gif')

export default function ShowTile({showInfo}: {showInfo: IShow}) {
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
