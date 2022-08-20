import React, {useEffect} from 'react'
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native'
import './Store'
import {useSearch, useShowsAPI} from './services/api/ApiConsumer'
import Header from './components/Header'
import {IStore, useStore} from './Store'

const loadingIndicator = require('./assets/cupertino_activity_indicator.gif')

const ShowTile = ({showInfo}) => (
  <TouchableOpacity
    style={{flex: 1, height: 210, margin: 3}}
    onPress={() => {}}>
    <>
      <Image
        style={{width: '100%', height: '100%', position: 'absolute'}}
        source={{uri: showInfo?.image?.medium}}
        resizeMethod={'scale'}
        loadingIndicatorSource={loadingIndicator}
      />
      <Text style={{color: 'white'}}>{showInfo.name}</Text>
    </>
  </TouchableOpacity>
)

export default function App() {
  const isSearchActive = useStore((state: IStore) => state.isSearchActive)
  const searchTerm = useStore((state: IStore) => state.searchTerm)

  const {showsPages, setPages, currentPages, isError, isLoading} = useShowsAPI()
  const {searchResults} = useSearch(searchTerm, isSearchActive)

  const showsList = isSearchActive
    ? searchResults
    : showsPages.reduce((acc, curr) => acc.concat(curr), [])

  function handleEndReach() {
    setPages(currentPages + 1)
  }

  function renderItem({item}) {
    return <ShowTile showInfo={item} />
  }

  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <Header />
      <FlatList
        data={showsList}
        renderItem={renderItem}
        keyExtractor={show => show.id}
        numColumns={3}
        onEndReached={handleEndReach}
        onEndReachedThreshold={0.45}
      />
    </SafeAreaView>
  )
}
