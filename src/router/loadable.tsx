/**
 *使用react-loadable替换 lazy, LazyExoticComponent实现路由懒加载，优化性能
 *lazy, LazyExoticComponent实现懒加载，首次加载会闪屏
 **/
import React from 'react'
import Loadable from 'react-loadable'
export default function AsyncLoader(loader: any) {
  return Loadable({
    loader,
    loading: () => {
      return <div>页面加载中...</div>
    },
  })
}
