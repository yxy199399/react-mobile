import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd-mobile'
import store from '@/store'
import { USERMESSAGE } from '@/store/actionType'
import { logoutAction } from '@/store/actionCreators'
import Header from '@/components/header'
import FooterBar from '@/components/footerBar'
interface IProps {
  user: UserInfo
  userChange: (data: UserInfo) => void
}
function UserComponent({ user }: IProps) {
  return (
    <>
      <Header title='用户' />
      <div className='page-content page-footer-bar-main-content'>
        <p>用户名：{user.username}</p>
        <Button
          onClick={() => {
            store.dispatch(logoutAction() as any)
          }}
        >
          退出
        </Button>
      </div>
      <FooterBar active='我的' />
    </>
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
