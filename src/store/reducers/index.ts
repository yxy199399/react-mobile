import { combineReducers } from 'redux'
import { createRouterReducer } from '@lagunovsky/redux-react-router'
import { history } from '../history'
import user from './user'
import { CLEARSTORE } from './../actionType'
const rootReducer = combineReducers({
  router: createRouterReducer(history),
  user,
})
const appReducer: Reducer<AllState, Action> = (state, action) => {
  if (action.type === CLEARSTORE) {
    state = undefined
  }
  return rootReducer(state, action as any)
}
export default appReducer
