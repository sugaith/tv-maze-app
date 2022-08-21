import React from 'react'
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'
import RenderHtml from 'react-native-render-html'
import {useStore} from '../Store'
import Header from './Header'
import {useShowsDetailsAPI} from '../services/api/ApiConsumer'
import EpisodesHorizontalList from './EpisodesHorizontalList'

export const resizeMode = {
  cover: 'cover',
  contain: 'contain',
  stretch: 'stretch',
  center: 'center',
  repeat: 'repeat',
}

export default function ShowDetailsScreen() {
  const showInfo = useStore(state => state.showOfInterest)
  const {episodesBySeason, isLoading, isError} = useShowsDetailsAPI(showInfo.id)

  const {width} = useWindowDimensions()
  const htmlStyle = `
    padding: 9px; 
    background-color: rgba(0, 0, 0, 0.36); 
    color: white; 
    font-size: 18px
  `
  const htmlSummary = `
  <div style="${htmlStyle}">
    ${showInfo.summary}
  </div>
  `

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <Header />
      <ImageBackground
        style={[styles.posterView]}
        resizeMode={resizeMode.cover}
        source={{uri: showInfo?.image?.original}}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'flex-start',
            width,
          }}>
          <Text style={styles.name}>{showInfo.name}</Text>
          <Text style={styles.genres}>{showInfo.genres.join(', ')}</Text>
          <Text style={styles.genres}>
            {'Every ' + showInfo.schedule.days.join(', ')}
          </Text>
          <Text style={styles.genres}>{'at ' + showInfo.schedule.time}</Text>
          <RenderHtml contentWidth={width} source={{html: htmlSummary}} />

          {episodesBySeason?.map?.((season, i) => (
            <View key={`season${i}`}>
              <Text style={styles.genres}>{`Season ${i}`}</Text>
              <EpisodesHorizontalList season={season} />
            </View>
          ))}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  posterView: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
  },
  name: {
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
    color: 'white',
    fontSize: 45,
  },
  genres: {
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
    color: 'white',
    fontSize: 24,
  },
})
