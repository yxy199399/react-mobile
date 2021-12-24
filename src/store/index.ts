import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import appReducer from './reducers'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose
const enhancer = composeEnhancers(applyMiddleware(thunk))
const store = createStore(appReducer, undefined, enhancer)
export default store
