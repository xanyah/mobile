import { Platform } from 'react-native'

import { colors } from '../../constants/styles'

export default {
  articlesCountContainer: {
    alignItems: 'center',
    borderLeftColor: colors.lightGrey,
    borderLeftWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    color: colors.secondaryBlue,
    fontSize: 24,
    fontWeight: '500',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  itemContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 7,
    padding: 20,
    paddingRight: 0,
    ...Platform.select({
      android: {

      },
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          height: 2,
          width: 0,
        },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
    }),
  },
  itemCount: {
    color: colors.lightBlue,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  itemCountLabel: {
    color: colors.lightBlue,
    fontSize: 14,
    textAlign: 'center',
  },
  itemSubtitle: {
    color: colors.lightBlue,
    fontSize: 14,
  },
  itemTitle: {
    color: colors.primaryBlue,
    fontSize: 18,
    fontWeight: '500',
  },
}
