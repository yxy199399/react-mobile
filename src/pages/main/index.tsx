import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
export default function Main() {
  const token = localStorage.getItem('token')
  return <div>{token ? <Outlet /> : <Navigate to='/login' />}</div>
}
