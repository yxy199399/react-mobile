import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AsyncLoader from './loadable'
const Login = AsyncLoader(() => import('@/pages/login'))
const Main = AsyncLoader(() => import('@/pages/main'))
const MainHome = AsyncLoader(() => import('@/pages/main/home'))
const MainUser = AsyncLoader(() => import('@/pages/main/user'))
export default function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/main' />} />
      <Route path='/main' element={<Navigate to='/main/home' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/main' element={<Main />}>
        <Route path='/main/home' element={<MainHome />} />
        <Route path='/main/user' element={<MainUser />} />
      </Route>
    </Routes>
  )
}
