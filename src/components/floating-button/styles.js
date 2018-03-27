import { Platform } from 'react-native'

import { colors } from '../../constants/styles'

export default {
  actionButton: {
    alignItems: 'center',
    backgroundColor: colors.primaryBlue,
    borderRadius: 30,
    bottom: 20,
    height: 60,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    width: 60,
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          height: 2,
          width: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
      },
    }),
  },
  actionButtonImage: {
    height: 36,
    resizeMode: 'contain',
    width: 36,
  },
}
