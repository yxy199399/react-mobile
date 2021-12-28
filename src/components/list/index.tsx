import React, { useState } from 'react'
import {
  InfiniteScroll,
  PullToRefresh,
  Empty,
  Loading,
  SearchBar,
} from 'antd-mobile'
import Axios from '@/http'
import styles from './index.module.scss'

const InfiniteScrollContent = ({
  hasMore,
  total,
}: {
  hasMore?: boolean
  total: number
}) => {
  return (
    <div>
      {hasMore ? (
        <>
          <span>Loading</span>
          <Loading />
        </>
      ) : (
        <span>{total > 0 && '没有更多了'}</span>
      )}
    </div>
  )
}

interface IProps<T> {
  api: HttpUrlKey // 请求接口
  rowKey?: string
  params?: any // 额外参数
  searchKey?: string // 搜索字段
  refesh?: boolean // 是否下拉刷新，false是，true否
  renderItem: (data: T) => React.ReactNode
}

export default function ListView<T>({
  api,
  rowKey,
  params,
  refesh = false,
  searchKey,
  renderItem,
}: IProps<T>) {
  const [data, setData] = useState<T[]>([])
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [hasMore, setHasMore] = useState(true)
  const [searchVal, setSearchVar] = useState<string>()

  const getList = async (pageNum?: number, searchNull?: string) => {
    const res = await Axios.get(api, {
      params: {
        page: pageNum || page,
        pageSize: 10,
        [searchKey!]: searchNull === '' ? searchNull : searchVal,
        ...params,
      },
    })
    if (res.data.code === 200) {
      // 异步
      if (pageNum) {
        setHasMore(10 < res.data.total)
        setPage(2)
        setData([...res.data.data])
      } else {
        setHasMore(data.length + 10 < res.data.total)
        setPage(page + 1)
        setData([...data, ...res.data.data])
      }
      setTotal(res.data.total)
    }
  }

  return (
    <>
      {searchKey && (
        <div className={styles.header}>
          <div className={styles.left}>
            <SearchBar
              placeholder='请输入内容'
              showCancelButton={() => true}
              value={searchVal}
              onChange={(v) => {
                setSearchVar(v)
              }}
              onSearch={() => {
                getList(1)
              }}
              onCancel={() => {
                getList(1, '')
              }}
            />
          </div>
        </div>
      )}
      <PullToRefresh
        disabled={refesh}
        onRefresh={async () => {
          getList(1)
        }}
      >
        {data.length > 0 ? (
          <>
            {data.map((item, index) => (
              <React.Fragment
                key={(item as any).id || (item as any)[rowKey!] || index}
              >
                {renderItem(item)}
              </React.Fragment>
            ))}
          </>
        ) : (
          <Empty description='暂无数据' />
        )}
      </PullToRefresh>

      <InfiniteScroll loadMore={getList} hasMore={hasMore} threshold={10}>
        <InfiniteScrollContent hasMore={hasMore} total={total} />
      </InfiniteScroll>
    </>
  )
}

// 使用
// interface ListType {
//   name: string
//   id: string
// }
// <ListView<ListType>
//   api='test'
//   searchKey='searchKey'
//   renderItem={(data) => {
//     return <div>{data.name}</div>
//   }}
// />
