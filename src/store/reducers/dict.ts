import { Reducer } from 'redux'
import { DICTLOADING, DICTFAIL, DICTSUCCESS } from '../actionType'

const initState: {
  [k: string]: {
    loading: boolean
    success: boolean
    list: any[]
  }
} = {}

interface dictAction {
  type: string
  value: {
    path: string
    data: any
  }
}

export type State = typeof initState

const dictReducer: Reducer<State, dictAction> = (
  state: State = initState,
  action: dictAction
) => {
  let newState = JSON.parse(JSON.stringify(state))
  if (action.type === DICTSUCCESS) {
    const { data, path } = action.value
    newState[path] = {
      loading: false,
      success: true,
      list: data,
    }
    return newState
  }
  if (action.type === DICTLOADING) {
    const { path } = action.value
    newState[path] = {
      loading: true,
      success: false,
      list: [],
    }
    return newState
  }
  if (action.type === DICTFAIL) {
    const { path } = action.value
    newState[path] = {
      loading: false,
      success: false,
      list: [],
    }
    return newState
  }
  return state
}

export default dictReducer
