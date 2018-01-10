import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { reducer } from '../reducers'

const configureStore = () => {
  const store = createStore(
    reducer,
    {},
    compose(
      applyMiddleware(thunk)
    )
  )

  if (module.hot) {
    module.hot.accept(() => {
      const nextReducer = require('../reducers/index').default

      store.replaceReducer(nextReducer)
    })
  }

  return store
}

export default configureStore()
