import React from 'react'
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native'
import {useShowsAPI} from './services/ApiConsumer'
import Header from './components/Header'

const loadingIndicator = require('./assets/cupertino_activity_indicator.gif')

const ShowTile = ({showInfo}) => (
  <TouchableOpacity
    style={{flex: 1, height: 210, margin: 3}}
    onPress={() => {}}>
    <>
      <Image
        style={{width: '100%', height: '100%', position: 'absolute'}}
        source={{uri: showInfo.image.medium}}
        resizeMethod={'scale'}
        loadingIndicatorSource={loadingIndicator}
      />
      <Text style={{color: 'white'}}>{showInfo.name}</Text>
    </>
  </TouchableOpacity>
)

export default function App() {
  const {showsPages, setPages, currentPages, isError, isLoading} = useShowsAPI()

  const showsList = showsPages
    ? showsPages.reduce((acc, curr) => acc.concat(curr), [])
    : []
  const renderItem = ({item}) => <ShowTile showInfo={item} />
  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <Header />
      <FlatList
        data={showsList}
        renderItem={renderItem}
        keyExtractor={show => show.id}
        numColumns={3}
        onEndReached={() => setPages(currentPages + 1)}
        onEndReachedThreshold={0.2}
      />
    </SafeAreaView>
  )
}
