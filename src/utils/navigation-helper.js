import { NavigationActions } from 'react-navigation'

export const resetTo = scene => NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: scene}),
  ],
})
