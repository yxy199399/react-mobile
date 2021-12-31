import React, { useState } from 'react'
import { Form, Input, Picker as OriginPicker } from 'antd-mobile'
import { FormItemProps } from 'antd-mobile/es/components/form/form-item'
import { FormInstance } from 'antd-mobile/es/components/form'
interface IProps extends Omit<FormItemProps, 'children'> {
  form?: FormInstance<any>
}
export default function Picker({ form, name, ...rest }: IProps) {
  const [visible, setVisible] = useState<boolean>()
  const [show, setShow] = useState<any>()
  const basicColumns = [
    [
      { label: '周一', value: 'Mon' },
      { label: '周二', value: 'Tues' },
      { label: '周三', value: 'Wed' },
      { label: '周四', value: 'Thur' },
      { label: '周五', value: 'Fri' },
    ],
    [
      { label: '上午', value: 'am' },
      { label: '下午', value: 'pm' },
    ],
  ]

  return (
    <Form.Item
      onClick={() => {
        setVisible(true)
      }}
      {...rest}
    >
      <OriginPicker
        onConfirm={setShow}
        columns={basicColumns}
        visible={visible}
        value={show}
        onClose={() => {
          setVisible(false)
        }}
        onSelect={(val, extend) => {
          console.log('onSelect', val, extend.items)
        }}
      >
        {(items) => {
          return (
            <Input
              value={show}
              className='adm-list-item-content'
              disabled
              placeholder='请选择'
            />
          )
        }}
      </OriginPicker>
    </Form.Item>
  )
}
