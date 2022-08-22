import {StyleSheet} from 'react-native'

const height = 120
export const styles = StyleSheet.create({
  container: {
    height,
  },
  horizontalScroll: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height,
  },
  imageBackground: {
    height,
    width: 180,
    marginHorizontal: 3,
  },
  text: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    fontSize: 18,
  },
})
