import React from 'react'
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {resizeMode} from '../Utils'

export default function EpisodesHorizontalList({season}) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        style={styles.horizontalScroll}
        contentContainerStyle={styles.horizontalScroll}>
        {season.map((episode, i) => (
          <TouchableOpacity key={`episode${episode.id}`}>
            <ImageBackground
              style={styles.imageBackground}
              resizeMode={resizeMode.cover}
              source={{uri: episode?.image?.medium}}>
              <Text style={styles.text}> {`${i + 1}. ${episode.name}`} </Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const height = 90
const styles = StyleSheet.create({
  container: {
    height: height,
  },
  horizontalScroll: {
    backgroundColor: 'gray',
    height: height,
  },
  imageBackground: {
    backgroundColor: 'red',
    height: height,
    width: 180,
    marginHorizontal: 3,
  },
  text: {
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
    color: 'white',
    fontSize: 24,
  },
})
