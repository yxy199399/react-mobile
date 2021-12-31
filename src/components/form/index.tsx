import React from 'react'
import { Form as OriginForm, Input, Button } from 'antd-mobile'
import Picker from './picker'
import styles from './index.module.scss'
export default function Form() {
  const Item = OriginForm.Item
  const [form] = OriginForm.useForm()

  return (
    <OriginForm
      form={form}
      className={styles['local-form']}
      footer={
        <Button block type='submit' color='primary'>
          提交
        </Button>
      }
    >
      <Item
        name='姓名'
        label='姓名'
        rules={[{ required: true, message: '姓名不能为空' }]}
      >
        <Input placeholder='请输入姓名' />
      </Item>
      <Item name='姓名' label='姓名' disabled>
        <Input placeholder='请输入姓名' />
      </Item>
      <Picker form={form} name='age' label='选择' />
    </OriginForm>
  )
}
