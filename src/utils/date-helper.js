import moment from 'moment'

import { en, fr } from '../i18n/moment'
import I18n from '../i18n'

moment.defineLocale('en', en)
moment.defineLocale('fr', fr)

moment.locale([ I18n.currentLocale(), 'en' ])

export const shortDate = date =>
  moment(new Date(date)).format(I18n.t('short_date_format'))

export const longDate = date =>
  moment(new Date(date)).format(I18n.t('long_date_format'))

export const timeAgo = date =>
  moment(new Date(date)).fromNow()
