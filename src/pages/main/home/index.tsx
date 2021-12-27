import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const navigate = useNavigate()
  return (
    <div>
      首页
      <button
        onClick={() => {
          navigate('/main/user')
        }}
      >
        用户
      </button>
    </div>
  )
}
