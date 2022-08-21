import React from 'react'
import {IStore, useStore} from '../Store'
import {StyleSheet, TextInput, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function SearchBox() {
  const isSearchActive = useStore((state: IStore) => state.isSearchActive)
  const setIsSearchActive = useStore((state: IStore) => state.setIsSearchActive)
  const searchTerm = useStore((state: IStore) => state.searchTerm)
  const setSearchTerm = useStore((state: IStore) => state.setSearchTerm)

  return (
    <View style={styles.container}>
      {isSearchActive && (
        <TextInput
          autoFocus
          style={styles.input}
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />
      )}
      <Icon.Button
        style={styles.icon}
        name={isSearchActive ? 'close' : 'search'}
        size={45}
        color={isSearchActive ? 'gray' : 'white'}
        backgroundColor={isSearchActive ? 'white' : 'transparent'}
        onPress={() => setIsSearchActive(!isSearchActive)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 9,
  },
  icon: {
    height: '100%',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    fontSize: 36,
  },
})
