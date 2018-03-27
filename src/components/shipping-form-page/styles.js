import { Platform } from 'react-native'

import { colors } from '../../constants/styles'

export default {
  headerText: {
    color: colors.lightBlue,
    fontSize: 18,
    fontWeight: '500',
    margin: 20,
    textAlign: 'center',
  },
  provider: {
    color: colors.primaryBlue,
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  providerContainer: {
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
}
