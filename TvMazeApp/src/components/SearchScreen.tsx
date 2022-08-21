import React from 'react'
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native'
import {useStore} from '../Store'
import {useDebounceValue} from '../Utils'
import {useSearchAPI} from '../services/api/ApiConsumer'
import Header from './Header'
import ShowTile from './ShowTile'
import {useFocusEffect} from '@react-navigation/native'

export default function SearchScreen() {
  const searchTerm = useStore(state => state.searchTerm)
  const setIsSearchActive = useStore(state => state.setIsSearchActive)

  const debouncedSearchTerm = useDebounceValue(searchTerm, 900)
  const {searchResults} = useSearchAPI(debouncedSearchTerm, true)

  useFocusEffect(
    React.useCallback(() => {
      setIsSearchActive(true)
      return () => setIsSearchActive(false)
    }, [setIsSearchActive]),
  )

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {searchResults.length ? (
        <FlatList
          style={styles.container}
          data={searchResults}
          renderItem={({item}) => <ShowTile showInfo={item} />}
          keyExtractor={show => show.id}
          numColumns={3}
        />
      ) : (
        <View style={styles.noResultsView}>
          <Text style={styles.h1}>No results found</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 9,
  },
  noResultsView: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  h1: {
    color: 'white',
    fontSize: 24,
  },
})
