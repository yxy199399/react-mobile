import React from 'react'
import { connect } from 'react-redux'
import { USERMESSAGE } from '@/store/actionType'
interface IProps {
  user: UserInfo
  userChange: (data: UserInfo) => void
}
function UserComponent({ user }: IProps) {
  return <div>用户名：{user.username}</div>
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
