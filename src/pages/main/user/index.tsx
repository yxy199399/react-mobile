import React from 'react'
import { connect } from 'react-redux'
import store from '@/store'
import { USERMESSAGE } from '@/store/actionType'
import { logoutAction } from '@/store/actionCreators'
interface IProps {
  user: UserInfo
  userChange: (data: UserInfo) => void
}
function UserComponent({ user }: IProps) {
  return (
    <div>
      <p>用户名：{user.username}</p>
      <button
        onClick={() => {
          store.dispatch(logoutAction() as any)
        }}
      >
        退出
      </button>
    </div>
  )
}

const stateToProps = (state: AllState) => {
  return {
    user: state.user,
  }
}

const dispachToProps = (disptch: Dispatch) => {
  return {
    userChange: (val: UserInfo) => {
      disptch({ type: USERMESSAGE, value: val })
    },
  }
}

export default connect(stateToProps, dispachToProps)(UserComponent)
