import React, { useEffect } from 'react'
import { Form as OriginForm, Input, Button } from 'antd-mobile'
import Picker from './picker'
import styles from './index.module.scss'
interface Dept extends PickerType {
  deptName: string
  deptValue: number
}
export default function Form() {
  const Item = OriginForm.Item
  const [form] = OriginForm.useForm()
  useEffect(() => {
    form?.setFieldsValue({
      username: '111',
      age: 3,
    })
  }, [])

  return (
    <OriginForm
      form={form}
      className={styles['local-form']}
      footer={
        <Button block type='submit' color='primary'>
          提交
        </Button>
      }
      onFinish={(values) => {
        console.log(values)
      }}
    >
      <Item
        name='username'
        label='姓名'
        rules={[{ required: true, message: '姓名不能为空' }]}
      >
        <Input placeholder='请输入姓名' />
      </Item>
      <Item
        label='选择'
        name='age'
        rules={[{ required: true, message: '姓名不能为空' }]}
      >
        <Picker<Dept>
          listFormat={(list) => {
            return list.map((item) => {
              item.label = item.deptName
              item.value = item.deptValue
              return item
            })
          }}
          labelFormat={(data) => {
            let show = ''
            data.forEach((item) => {
              show += item.label
            })
            return 'format:' + show
          }}
          valueFormat={(values) => {
            const formData = form?.getFieldsValue()
            form?.setFieldsValue({
              ...formData,
              age: values[0].value,
            })
          }}
          requestData={{ api: 'dept' }}
        />
      </Item>
    </OriginForm>
  )
}
