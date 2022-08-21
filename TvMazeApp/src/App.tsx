import React, {useEffect, useRef} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import './Store'

import HomeScreen from './components/HomeScreen'
import {useStore} from './Store'
import ShowDetailsScreen from './components/ShowDetailsScreen'

const Stack = createStackNavigator()

export const screens = {
  Home: 'Home',
  ShowDetails: 'ShowDetails',
}

export default function App() {
  const setNavigationRef = useStore(state => state.setNavigationRef)
  const navigationRef = useRef()

  useEffect(() => {
    setNavigationRef(navigationRef.current)
  }, [setNavigationRef])

  return (
    <NavigationContainer
      ref={navigationRef}
      children={
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={screens.Home} component={HomeScreen} />
          <Stack.Screen
            name={screens.ShowDetails}
            component={ShowDetailsScreen}
          />
        </Stack.Navigator>
      }
    />
  )
}
