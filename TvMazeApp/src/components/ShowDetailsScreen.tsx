import React from 'react'
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import RenderHtml from 'react-native-render-html'
import {useStore} from '../Store'
import {resizeMode} from '../Utils'
import {useShowsDetailsAPI} from '../services/api/ApiConsumer'
import Header from './Header'
import EpisodesHorizontalList from './EpisodesHorizontalList'
import {htmlStyle, styles} from './styles/ShowDetailsScreenStyle'

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
          <Text style={styles.h3}>{showInfo.genres.join(', ')}</Text>
          <View style={styles.scheduleView}>
            <Icon name={'calendar'} size={30} color={'white'} />
            <Text style={styles.h2}>
              {'Every ' + showInfo.schedule.days.join(', ')}
            </Text>
          </View>
          <View style={styles.scheduleView}>
            <Icon name={'clock-o'} size={30} color={'white'} />
            <Text style={styles.h2}>{'at ' + showInfo.schedule.time}</Text>
          </View>
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
