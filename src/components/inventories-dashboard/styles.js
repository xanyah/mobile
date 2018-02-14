import { Platform } from 'react-native'

import { colors } from '../../constants/styles'

export default {
  header: {
    color: colors.secondaryBlue,
    fontSize: 24,
    fontWeight: '500',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  itemContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 7,
    padding: 20,
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
  itemTitle: {
    color: colors.primaryBlue,
    fontSize: 18,
    fontWeight: '500',
  },
}
