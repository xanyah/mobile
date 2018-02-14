import { NavigationActions } from 'react-navigation'

export const resetTo = scene => NavigationActions.reset({
  actions: [
    NavigationActions.navigate({ routeName: scene }),
  ],
  index: 0,
})

export const goTo = scene => NavigationActions.navigate({
  routeName: scene,
})
