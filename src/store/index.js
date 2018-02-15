import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import { navigationMiddleware } from '../middlewares'
import defaultReducer, { reducer } from '../reducers'

const configureStore = () => {
  const store = createStore(
    reducer,
    {},
    compose(
      applyMiddleware(thunk),
      applyMiddleware(navigationMiddleware)
    )
  )

  if (module.hot) {
    module.hot.accept(() => {
      const nextReducer = defaultReducer

      store.replaceReducer(nextReducer)
    })
  }

  return store
}

export default configureStore()
