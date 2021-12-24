import { combineReducers } from 'redux'
import user from './user'
import { CLEARSTORE } from './../actionType'
const rootReducer = combineReducers({ user })
const appReducer: Reducer<AllState, Action> = (state, action) => {
  if (action.type === CLEARSTORE) {
    state = undefined
  }
  return rootReducer(state, action as any)
}
export default appReducer
