import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollView: {
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.63)',
  },
  posterView: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
  },
  scheduleView: {
    marginLeft: 9,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  h1: {
    padding: 9,
    color: 'white',
    fontSize: 45,
    fontWeight: 'bold',
  },
  h2: {
    padding: 9,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  h3: {
    padding: 9,
    color: 'white',
    fontSize: 24,
  },
})
export const htmlStyle = `
  padding: 9px; 
  color: white; 
  font-size: 18px
`
