import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {
  createRouterMiddleware,
  ReduxRouterState,
} from '@lagunovsky/redux-react-router'
import appReducer from './reducers'
import { history } from './history'
export interface RouterState {
  router: ReduxRouterState
}
const routerMiddleware = createRouterMiddleware(history)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose
const enhancer = composeEnhancers(applyMiddleware(routerMiddleware, thunk))
const store = createStore(appReducer, undefined, enhancer)
export default store
