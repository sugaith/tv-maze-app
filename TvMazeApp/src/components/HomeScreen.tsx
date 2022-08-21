import React from 'react'
import {FlatList, SafeAreaView, StyleSheet} from 'react-native'
import {useSearchAPI, useShowsAPI} from '../services/api/ApiConsumer'
import {useDebounceValue} from '../Utils'
import {useStore} from '../Store'
import Header from './Header'
import ShowTile from './ShowTile'

export default function HomeScreen() {
  const isSearchActive = useStore(state => state.isSearchActive)
  const searchTerm = useStore(state => state.searchTerm)
  const {showsPages, setPages, currentPages} = useShowsAPI()

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

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={showsList}
        renderItem={({item}) => <ShowTile showInfo={item} />}
        keyExtractor={show => show.id}
        numColumns={3}
        onEndReached={handleEndReach}
        onEndReachedThreshold={0.45}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
})
