import React from 'react'
import {TextInput, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {useStore} from '../Store'
import {screens} from '../App'
import {styles} from './styles/SearchBoxStyle'

export default function SearchBox() {
  const navigationRef = useStore(state => state.navigationRef)
  const isSearchActive = useStore(state => state.isSearchActive)
  const setIsSearchActive = useStore(state => state.setIsSearchActive)
  const searchTerm = useStore(state => state.searchTerm)
  const setSearchTerm = useStore(state => state.setSearchTerm)

  function handlesSearchPress() {
    if (!isSearchActive) {
      navigationRef.navigate(screens.Search)
    } else {
      setIsSearchActive(false)
      navigationRef.goBack()
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={[isSearchActive && styles.whiteBackGround, styles.subContainer]}>
        {isSearchActive && (
          <TextInput
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
          onPress={handlesSearchPress}
        />
      </View>
    </View>
  )
}
