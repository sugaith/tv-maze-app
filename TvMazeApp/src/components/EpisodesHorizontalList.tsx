import React from 'react'
import {ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native'
import {resizeMode} from './ShowDetailsScreen'

export default function EpisodesHorizontalList({season}) {
  return (
    <View
      style={{
        height: 90,
      }}>
      <ScrollView
        horizontal
        style={{
          backgroundColor: 'gray',

          height: 90,
        }}
        contentContainerStyle={{
          backgroundColor: 'blue',

          height: 90,
        }}>
        {season.map((episode, i) => (
          <ImageBackground
            style={{
              backgroundColor: 'red',
              height: 90,
              width: 180,
              marginHorizontal: 3,
            }}
            resizeMode={resizeMode.cover}
            source={{uri: episode?.image?.medium}}
            key={`episode${episode.id}`}>
            <Text style={styles.genres}> {`${i + 1}. ${episode.name}`} </Text>
          </ImageBackground>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  genres: {
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
    color: 'white',
    fontSize: 24,
  },
})
