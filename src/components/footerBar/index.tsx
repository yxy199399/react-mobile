import React from 'react'
import { useNavigate } from 'react-router-dom'
import cs from 'classnames'
import styles from './index.module.scss'
interface IProps {
  active: string
  back?: boolean
}
export default function FooterBar(props: IProps) {
  const navigate = useNavigate()
  const barList = [
    {
      name: '首页',
      path: '/main/home',
      icon: 'icon-a-Fill1',
    },
    {
      name: '我的',
      path: '/main/user',
      icon: 'icon-a-bianzu2',
    },
  ]
  const handleClick = (i: number) => {
    const item = barList[i]
    navigate(item.path, { replace: true })
  }
  return (
    <div className={styles['page-bar']}>
      {barList.map((item, index) => {
        return (
          <div
            className={cs(styles['tab-item'], {
              [styles['tab-item-active']]: item.name === props.active,
            })}
            onTouchStart={handleClick.bind('$event', index)}
            key={index}
          >
            <i className={cs(`iconfont ${item.icon}`, styles['bar-icon'])} />
            <p className={styles['bar-text']}>{item.name}</p>
          </div>
        )
      })}
    </div>
  )
}
