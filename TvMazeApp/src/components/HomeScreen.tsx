import React, {useCallback, useRef, useState} from 'react'
import {
  BackHandler,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
} from 'react-native'
import {useFocusEffect} from '@react-navigation/native'
import {useShowsAPI} from '../services/api/ApiConsumer'
import Header from './Header'
import ShowTile from './ShowTile'
import {styles} from './styles/HomeScreenStyle'

export default function HomeScreen() {
  const [canExit, setCanExit] = useState(false)
  const blockerTimeRef = useRef()

  const exitBlocker = useCallback(() => {
    if (!canExit) {
      ToastAndroid.show('Tap again to exit', ToastAndroid.SHORT)
      setCanExit(true)
      blockerTimeRef.current = setTimeout(() => setCanExit(false), 2100)
      return true
    }
  }, [canExit])

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', exitBlocker)
      return () => {
        clearTimeout(blockerTimeRef.current)
        BackHandler.removeEventListener('hardwareBackPress', exitBlocker)
      }
    }, [exitBlocker]),
  )

  const {showsPages, setPages, currentPages} = useShowsAPI()
  const showsList = showsPages.reduce((acc, curr) => acc.concat(curr), [])
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={showsList}
        renderItem={({item}) => <ShowTile showInfo={item} />}
        keyExtractor={show => show.id}
        numColumns={3}
        onEndReached={() => setPages(currentPages + 1)}
        onEndReachedThreshold={0.9}
      />
    </SafeAreaView>
  )
}
