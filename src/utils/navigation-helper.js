import { NavigationActions } from 'react-navigation'

export const resetHome = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home'}),
  ],
})
