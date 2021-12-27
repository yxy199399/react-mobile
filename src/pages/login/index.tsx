import React from 'react'
import store from '@/store'
import { loginAction } from '@/store/actionCreators'
export default function Login() {
  return (
    <div>
      <button
        onClick={() => {
          store.dispatch(loginAction() as any)
        }}
      >
        登录
      </button>
    </div>
  )
}
