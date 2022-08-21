import React from 'react'
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native'
import '../Store'
import {useSearchAPI, useShowsAPI} from '../services/api/ApiConsumer'
import Header from './Header'
import {IStore, useStore} from '../Store'
import useDebounceValue from '../Utils'

const loadingIndicator = require('../assets/cupertino_activity_indicator.gif')

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

export default function HomeScreen() {
  const isSearchActive = useStore((state: IStore) => state.isSearchActive)
  const searchTerm = useStore((state: IStore) => state.searchTerm)

  const {showsPages, setPages, currentPages, isError, isLoading} = useShowsAPI()

  const debouncedSearchTerm = useDebounceValue(searchTerm, 900)
  const {searchResults} = useSearchAPI(debouncedSearchTerm, isSearchActive)

  const showsList = isSearchActive
    ? searchResults
    : showsPages.reduce((acc, curr) => acc.concat(curr), [])

  function handleEndReach() {
    if (!isSearchActive) {
      setPages(currentPages + 1)
    }
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
