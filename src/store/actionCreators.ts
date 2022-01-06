import {
  LOGIN,
  CLEARSTORE,
  DICTLOADING,
  DICTSUCCESS,
  DICTFAIL,
} from './actionType'
import { push } from '@lagunovsky/redux-react-router'
import Axios, { httpSuccess } from '@/http'
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

export const dictAction = (path: string) => {
  return async (dispatch: Dispatch, getState: any) => {
    const { dict } = getState()
    const d = dict[path]
    if (d && (d.loading || d.success)) return
    dispatch({
      type: DICTLOADING,
      value: {
        path,
      },
    })
    await Axios.get('dict', {
      // url: URLLIST['dictItem'] + path,
      params: { dicCode: path },
    }).then((res) => {
      if (httpSuccess(res.data.code)) {
        const { data } = res.data
        dispatch({
          type: DICTSUCCESS,
          value: {
            path,
            data,
          },
        })
      } else {
        dispatch({
          type: DICTFAIL,
          value: {
            path,
          },
        })
      }
    })
  }
}
