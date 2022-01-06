/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react'
import { Picker as OriginPicker, SearchBar } from 'antd-mobile'
import { cloneDeep } from 'lodash'
import Axios, { httpSuccess } from '@/http'
import { throttle } from '@/utils/tool'
import styles from '../index.module.scss'
interface IProps<T> {
  // form?: FormInstance<any>
  // name?: string
  search?: boolean
  value?: string
  onChange?: (val: string) => void // 改方法继承自Form.Item（同Input中onChange）, 无需传递,在值改变时触发
  listFormat?: (data: T[]) => T[] // 处理选项数据，对不是value、label属性添加label、value属性
  labelFormat?: (data: T[]) => string // 显示内容处理
  valueFormat?: (data: T[]) => void // 返回数据处理
  getListData?: () => T[]
  requestData?: {
    api: HttpUrlKey
    params?: any
    requestType?: 'get' | 'post'
  }
}
export default function Picker<T>({
  // name,
  // form,
  search,
  value,
  onChange,
  listFormat,
  labelFormat,
  valueFormat,
  getListData,
  requestData,
}: IProps<T>) {
  const [visible, setVisible] = useState<boolean>()
  const [basicColumns, setBasicColumns] = useState<any[]>([])
  const [allList, setAllList] = useState<any[]>([])

  useEffect(() => {
    getPickerData()
  }, [])

  const getPickerData = useCallback(async () => {
    if (getListData) {
      setBasicColumns([getListData()])
      setAllList(getListData())
    } else {
      const res = await Axios[requestData!.requestType || 'get'](
        requestData!.api,
        requestData!.params
      )
      if (httpSuccess(res.data.code)) {
        let data = res.data['data']
        if (listFormat) {
          data = listFormat(data)
        }
        setBasicColumns([data])
        setAllList(data)
      }
    }
  }, [])

  const initValue = useCallback(() => {
    if (value) {
      if (Array.isArray(value)) return value
      if (typeof value === 'string') return value.split(',')
      if (typeof value === 'number')
        return (value as number).toString().split(',').map(Number)
      return undefined
    }
    return undefined
  }, [value])()

  const delayChange = useCallback(
    throttle((v) => {
      let list = cloneDeep(allList)
      const newList = list.filter(
        (item: T) => (item as any).label.indexOf(v) > -1
      )
      setBasicColumns([newList])
    }, 300),
    [allList]
  )

  const handleChange = (v: string) => {
    delayChange(v)
  }

  return (
    <OriginPicker
      title={
        search ? (
          <SearchBar
            onChange={(v) => {
              handleChange(v)
            }}
          />
        ) : (
          ''
        )
      }
      columns={basicColumns}
      visible={visible}
      onClose={() => {
        setVisible(false)
      }}
      value={initValue as any}
      onConfirm={(val, extend) => {
        if (valueFormat) {
          valueFormat(extend.items as any)
          return
        }
        onChange!(val as any)
      }}
    >
      {(items) => {
        if (!items || items.every((item) => item === null)) {
          return (
            <div
              className={styles['div-holder']}
              onClick={() => {
                setVisible(true)
              }}
            >
              请选择
            </div>
          )
        } else {
          const selList = items.filter((item) => !!item)
          let total = selList.map((item) => item?.label ?? '未选择').join(',')
          if (labelFormat) {
            total = labelFormat(selList as any)
          }
          if (total)
            return (
              <div
                className={styles['div-value']}
                onClick={() => {
                  setVisible(true)
                }}
              >
                {total.toString()}
              </div>
            )
          return (
            <div
              className={styles['div-holder']}
              onClick={() => {
                setVisible(true)
              }}
            >
              请选择
            </div>
          )
        }
      }}
    </OriginPicker>
  )
}

// ;<Form.Item
//   label='选择'
//   name='age'
//   rules={[{ required: true, message: '姓名不能为空' }]}
// >
//   <Picker<Dept>
//     listFormat={(list) => {
//       return list.map((item) => {
//         item.label = item.deptName
//         item.value = item.deptValue
//         return item
//       })
//     }}
//     labelFormat={(data) => {
//       let show = ''
//       data.forEach((item) => {
//         show += item.label
//       })
//       return 'format:' + show
//     }}
//     valueFormat={(values) => {
//       const formData = form?.getFieldsValue()
//       form?.setFieldsValue({
//         ...formData,
//         age: values[0].value,
//       })
//     }}
//     requestData={{ api: 'dept' }}
//   />
// </Form.Item>
