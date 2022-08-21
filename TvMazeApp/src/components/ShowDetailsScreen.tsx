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
import {resizeMode} from '../Utils'
import {useShowsDetailsAPI} from '../services/api/ApiConsumer'
import Header from './Header'
import EpisodesHorizontalList from './EpisodesHorizontalList'

export default function ShowDetailsScreen() {
  const showInfo = useStore(state => state.showOfInterest)
  const {episodesBySeason} = useShowsDetailsAPI(showInfo.id)
  const {width} = useWindowDimensions()

  const htmlSummary = `
    <div style="${htmlStyle}">
      ${showInfo.summary}
    </div>
  `

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ImageBackground
        style={[styles.posterView]}
        resizeMode={resizeMode.cover}
        source={{uri: showInfo?.image?.original}}>
        <ScrollView contentContainerStyle={[styles.scrollView, {width}]}>
          <Text style={styles.h1}>{showInfo.name}</Text>
          <Text style={styles.h2}>{showInfo.genres.join(', ')}</Text>
          <Text style={styles.h2}>
            {'Every ' + showInfo.schedule.days.join(', ')}
          </Text>
          <Text style={styles.h2}>{'at ' + showInfo.schedule.time}</Text>
          <RenderHtml contentWidth={width} source={{html: htmlSummary}} />

          {episodesBySeason?.map?.((season, i) => (
            <View key={`season${i}`}>
              <Text style={styles.h2}>{`Season ${i}`}</Text>
              <EpisodesHorizontalList season={season} />
            </View>
          ))}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollView: {
    alignItems: 'flex-start',
  },
  posterView: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
  },
  h1: {
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
    color: 'white',
    fontSize: 45,
  },
  h2: {
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
    color: 'white',
    fontSize: 24,
  },
})
const htmlStyle = `
  padding: 9px; 
  background-color: rgba(0, 0, 0, 0.36); 
  color: white; 
  font-size: 18px
`
