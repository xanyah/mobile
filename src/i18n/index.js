import I18n from 'react-native-i18n'

import en from './dictionnaries/en.json'
import fr from './dictionnaries/fr.json'

I18n.fallbacks = true

I18n.translations = {
  en,
  fr,
}

export default I18n
