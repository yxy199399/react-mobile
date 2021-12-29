import React from 'react'
import Header from '@/components/header'
import FooterBar from '@/components/footerBar'
export default function Home() {
  return (
    <>
      <Header title='首页' back />
      <div className='page-content page-footer-bar-main-content'>111</div>
      <FooterBar active='首页' />
    </>
  )
}
