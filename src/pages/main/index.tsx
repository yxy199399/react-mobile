import React from 'react'
import { Outlet } from 'react-router-dom'
export default function Main() {
  const token = localStorage.getItem('token')
  return (
    <div>
      <h2>标题</h2>
      {token && <Outlet />}
    </div>
  )
}
