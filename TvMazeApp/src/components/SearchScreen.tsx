import React, {useEffect} from 'react'
import {FlatList, SafeAreaView, Text, View} from 'react-native'
import {useStore} from '../Store'
import {useDebounceValue} from '../Utils'
import {useSearchAPI} from '../services/api/ApiConsumer'
import Header from './Header'
import ShowTile from './ShowTile'
import {useFocusEffect} from '@react-navigation/native'
import {styles} from './styles/SearchScreenStyle'

export default function SearchScreen() {
  const searchTerm = useStore(state => state.searchTerm)
  const setIsSearchActive = useStore(state => state.setIsSearchActive)
  const [displayNoResults, setDisplayNoResults] = React.useState(false)

  const debouncedSearchTerm = useDebounceValue(searchTerm, 900)
  const {searchResults} = useSearchAPI(debouncedSearchTerm, true)

  useFocusEffect(
    React.useCallback(() => {
      setIsSearchActive(true)
      return () => setIsSearchActive(false)
    }, [setIsSearchActive]),
  )

  useEffect(() => {
    if (searchResults.length) {
      setDisplayNoResults(false)
    } else {
      setTimeout(() => setDisplayNoResults(true), 1500)
    }
  }, [setDisplayNoResults, searchResults])

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.resultsView}>
        {searchResults.length ? (
          <FlatList
            style={styles.container}
            data={searchResults}
            renderItem={({item}) => <ShowTile showInfo={item} />}
            keyExtractor={show => show.id}
            numColumns={3}
          />
        ) : (
          displayNoResults && <Text style={styles.h1}>No results found</Text>
        )}
      </View>
    </SafeAreaView>
  )
}
