import {
  Platform,
  StatusBar,
} from 'react-native'

export const setDarkStatusbar = () => {
  StatusBar.setBarStyle('light-content')
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('#1C277E')
  }
}

export const setLightStatusbar = () => {
  StatusBar.setBarStyle('dark-content')
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('#FFFFFF')
  }
}

export const setTranslucent = () => {
  if (Platform.OS === 'android') {
    StatusBar.setTranslucent(false)
  }
}
