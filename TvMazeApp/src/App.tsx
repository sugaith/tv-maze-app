import React, {useEffect, useRef} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import './Store'
import {useStore} from './Store'
import HomeScreen from './components/HomeScreen'
import ShowDetailsScreen from './components/ShowDetailsScreen'
import SearchScreen from './components/SearchScreen'
import EpisodeDetailScreen from './components/EpisodeDetailScreen'

const Stack = createStackNavigator()
export const screens = {
  Home: 'Home',
  ShowDetails: 'ShowDetails',
  EpisodeDetails: 'EpisodeDetails',
  Search: 'Search',
}

export default function App() {
  const setNavigationRef = useStore(state => state.setNavigationRef)
  const navigationRef = useRef()

  useEffect(() => {
    setNavigationRef(navigationRef.current)
  }, [setNavigationRef])

  const stack = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={screens.Home} component={HomeScreen} />
      <Stack.Screen name={screens.ShowDetails} component={ShowDetailsScreen} />
      <Stack.Screen name={screens.Search} component={SearchScreen} />
      <Stack.Screen
        name={screens.EpisodeDetails}
        component={EpisodeDetailScreen}
      />
    </Stack.Navigator>
  )

  return <NavigationContainer ref={navigationRef} children={stack} />
}
