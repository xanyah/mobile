import { colors } from '../../constants/styles'

export default {
  error: {
    backgroundColor: 'transparent',
    color: colors.red,
    fontWeight: '500',
    textAlign: 'center',
  },
  mainContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  wallpaper: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    resizeMode: 'cover',
    right: 0,
    top: 0,
  },
}
