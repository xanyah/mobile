import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux'

import defaultReducer, { reducer } from '../reducers'

const configureStore = () => {
  const store = createStore(
    reducer,
    {},
    compose(applyMiddleware(thunk))
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
