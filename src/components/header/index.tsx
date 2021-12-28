import React from 'react'
import { LeftOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
interface IProps {
  title: string
  back?: boolean
  backFn?: () => void
  children?: React.ReactNode
}
export default function Header(props: IProps) {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }
  return (
    <div className={styles['header']}>
      <div
        className={styles['header-back']}
        onClick={props.backFn ? props.backFn : handleBack}
      >
        {props.back && <LeftOutline color='#fff' />}
      </div>
      <div className={styles['header-title']}>{props.title}</div>
      <div className={styles['header-exta']}>{props.children}</div>
    </div>
  )
}
