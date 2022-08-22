import React, {useCallback, useEffect, useRef, useState} from 'react'
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  SafeAreaView,
  ToastAndroid,
  View,
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
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', exitBlocker)
    }, [exitBlocker]),
  )

  useEffect(() => () => clearTimeout(blockerTimeRef.current), [])

  const {showsPages, setPages, currentPages, isLoading} = useShowsAPI()
  const showsList = showsPages.reduce((acc, curr) => acc.concat(curr), [])
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={showsList}
        keyExtractor={show => show.id}
        renderItem={({item}) => <ShowTile showInfo={item} />}
        numColumns={3}
        onEndReached={() => setPages(currentPages + 1)}
        onEndReachedThreshold={0.9}
        progressViewOffset={200}
      />
      <View style={styles.activityIndicatorView}>
        {isLoading && <ActivityIndicator {...styles.activityIndicator} />}
      </View>
    </SafeAreaView>
  )
}
