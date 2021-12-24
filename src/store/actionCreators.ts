import { LOGIN } from './actionType'
export const loginAction = () => {
  return async (dispatch: Dispatch) => {
    const token = 111
    const action = {
      type: LOGIN,
      value: {
        token,
      },
    }
    dispatch(action)
  }
}
