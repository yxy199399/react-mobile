import { USERMESSAGE, LOGIN } from './../actionType'
import { cloneDeep } from 'lodash'
interface extaAction extends Action {
  value: string | UserInfo
}
const userReducer: Reducer<User, extaAction> = (
  state = {
    token: '',
    userInfo: {
      username: '',
    },
  },
  action
) => {
  const newState = cloneDeep(state)
  if (action.type === USERMESSAGE) {
    newState.userInfo = action.value as UserInfo
  }
  if (action.type === LOGIN) {
    newState.token = action.value as string
  }
  return newState
}

export default userReducer
