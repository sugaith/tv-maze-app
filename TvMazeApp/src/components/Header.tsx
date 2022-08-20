import React, {useState} from 'react'
import {Image, StyleSheet, TextInput, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {IStore, useStore} from '../Store'

const tvmLogo = require('../assets/tvm-header-logo.png')

function SearchBox() {
  const isSearchActive = useStore((state: IStore) => state.isSearchActive)
  const setIsSearchActive = useStore((state: IStore) => state.setIsSearchActive)
  const searchTerm = useStore((state: IStore) => state.searchTerm)
  const setSearchTerm = useStore((state: IStore) => state.setSearchTerm)

  return (
    <View
      style={{
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 9,
      }}>
      {isSearchActive && (
        <TextInput
          autoFocus
          style={styles.input}
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />
      )}
      <Icon.Button
        style={{height: '100%'}}
        name={isSearchActive ? 'close' : 'search'}
        size={45}
        color={isSearchActive ? 'gray' : 'white'}
        backgroundColor={isSearchActive ? 'white' : 'transparent'}
        onPress={() => setIsSearchActive(!isSearchActive)}
      />
    </View>
  )
}

export default function Header() {
  function render() {
    return (
      <View
        style={{
          height: 90,
          flexDirection: 'row',
        }}>
        <View style={{flex: 1}}>
          <Image source={tvmLogo} />
        </View>

        <SearchBox />
      </View>
    )
  }

  return render()
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    backgroundColor: 'white',
    fontSize: 36,
  },
})
