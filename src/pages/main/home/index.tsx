import React from 'react'
import Header from '@/components/header'
import FooterBar from '@/components/footerBar'
import Form from '@/components/form'
export default function Home() {
  return (
    <>
      <Header title='首页' back />
      <div className='page-content page-footer-bar-main-content'>
        <Form />
      </div>
      <FooterBar active='首页' />
    </>
  )
}
