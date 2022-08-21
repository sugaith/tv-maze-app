import React, {useCallback, useEffect, useRef, useState} from 'react'
import {
  BackHandler,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
} from 'react-native'
import {useShowsAPI} from '../services/api/ApiConsumer'
import Header from './Header'
import ShowTile from './ShowTile'
import {useFocusEffect} from '@react-navigation/native'

export default function HomeScreen() {
  const [canLeave, setCanLeave] = useState(false)
  const blockerTimeRef = useRef()

  const backBlocker = useCallback(() => {
    if (!canLeave) {
      ToastAndroid.show('Tap again to leave', ToastAndroid.SHORT)
      setCanLeave(true)
      blockerTimeRef.current = setTimeout(() => setCanLeave(false), 2000)

      return true
    }
  }, [canLeave])

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backBlocker)
      return () => {
        clearTimeout(blockerTimeRef.current)
        BackHandler.removeEventListener('hardwareBackPress', backBlocker)
      }
    }, [backBlocker]),
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
})
