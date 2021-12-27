import { LOGIN, CLEARSTORE } from './actionType'
import { push } from '@lagunovsky/redux-react-router'
export const loginAction = () => {
  return async (dispatch: Dispatch) => {
    const token = '111'
    localStorage.setItem('token', token)
    const action = {
      type: LOGIN,
      value: {
        token,
      },
    }
    dispatch(action)
    dispatch(push('/main/home'))
  }
}

export const logoutAction = () => {
  return async (dispatch: Dispatch) => {
    localStorage.clear()
    const action = {
      type: CLEARSTORE,
    }
    dispatch(action)
  }
}
