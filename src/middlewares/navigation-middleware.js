import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'

export const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
)

export default navigationMiddleware
