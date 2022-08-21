import React from 'react'
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {IEpisode} from '../services/api/types'
import {resizeMode} from '../Utils'
import {screens} from '../App'
import {useStore} from '../Store'

export default function EpisodesHorizontalList({season}: {season: IEpisode[]}) {
  const navigationRef = useStore(state => state.navigationRef)
  const setEpisodeOfInterest = useStore(state => state.setEpisodeOfInterest)

  function handlePress(episode: IEpisode) {
    setEpisodeOfInterest(episode)
    navigationRef.navigate(screens.EpisodeDetails)
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        persistentScrollbar
        style={styles.horizontalScroll}
        contentContainerStyle={styles.horizontalScroll}>
        {season.map((episode, i) => (
          <TouchableOpacity
            key={`episode${episode.id}`}
            onPress={() => handlePress(episode)}>
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

const height = 120
const styles = StyleSheet.create({
  container: {
    height,
  },
  horizontalScroll: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height,
  },
  imageBackground: {
    height,
    width: 180,
    marginHorizontal: 3,
  },
  text: {
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
    color: 'white',
    fontSize: 24,
  },
})
