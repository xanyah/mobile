import { colors, sizes } from '../../constants/styles'

const container = {
  alignItems: 'center',
  alignSelf: 'stretch',
  backgroundColor: colors.primaryBlue,
  borderColor: colors.primaryBlue,
  borderRadius: 4,
  display: 'flex',
  height: sizes.primaryHeight,
  justifyContent: 'center',
  marginVertical: 10,
}

export default {
  container,
  loadingContainer: {
    ...container,
    opacity: 0.5,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '500',
  },
}
