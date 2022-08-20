import React, {useState} from 'react'
import {Image, StyleSheet, TextInput, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const tvmLogo = require('../assets/tvm-header-logo.png')

function SearchBox() {
  const [isBoxOpened, setIsBoxOpened] = useState(false)

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 9,
      }}>
      {isBoxOpened && <TextInput style={styles.input} />}
      <Icon.Button
        style={{height: '100%'}}
        name={isBoxOpened ? 'close' : 'search'}
        size={45}
        color={isBoxOpened ? 'gray' : 'white'}
        backgroundColor={isBoxOpened ? 'white' : 'transparent'}
        onPress={() => setIsBoxOpened(!isBoxOpened)}
      />
    </View>
  )
}

export default function Header() {
  function render() {
    return (
      <View
        style={{
          backgroundColor: 'black',
          height: 90,
          flexDirection: 'row',
        }}>
        <View style={{flex: 1, backgroundColor: 'red'}}>
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
