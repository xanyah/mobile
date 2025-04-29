import * as i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import locale from 'react-native-locale-detector'
import resources from './dictionaries'
import { Settings } from 'luxon'

i18n
  .use({
    init: Function.prototype,
    type: 'languageDetector',
    detect: () => locale,
    cacheUserLanguage: Function.prototype,
  })
  .use(initReactI18next)
  .init({
    resources,
    debug: __DEV__,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

Settings.defaultLocale = locale
