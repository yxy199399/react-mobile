import React, { useState, useRef, useEffect } from 'react'
import { ImageUploader, Toast } from 'antd-mobile'
import {
  ImageUploadItem,
  ImageUploaderProps,
} from 'antd-mobile/es/components/image-uploader'
import { upload } from './demo'
import { httpSuccess } from '@/utils/tool'
interface IProps extends Omit<ImageUploaderProps, 'upload'> {
  size?: number
  defaultList?: any[]
  getChange: (fileList?: any[]) => void // 更新图片
}
export default function UploadImg({
  size,
  maxCount,
  defaultList,
  getChange,
  ...rest
}: IProps) {
  const [fileList, setFileList] = useState<ImageUploadItem[]>()
  const lastChoice = useRef<File[]>()
  useEffect(() => {
    getChange(fileList)
  }, [fileList])
  const mockUpload = async (file: File) => {
    const res = await upload(lastChoice.current!)
    if (httpSuccess(res.data.code)) {
      console.log(111)
    }
    return {
      url: URL.createObjectURL(file),
    }
  }
  const beforeUpload = async (file: File[]) => {
    if (size) {
      const sub = file.every((value: File) => value.size <= size)
      if (!sub) {
        Toast.show(`请选择小于${size / 1024 / 1024} M 的图片`)
        return []
      }
    }
    lastChoice.current = file
    return file
  }
  return (
    <ImageUploader
      defaultValue={defaultList || []}
      value={fileList}
      onChange={setFileList}
      upload={mockUpload}
      beforeUpload={beforeUpload}
      maxCount={maxCount}
      onCountExceed={(exceed) => {
        Toast.show(`最多选择 ${maxCount} 张图片，你多选了 ${exceed} 张`)
      }}
      {...rest}
    />
  )
}

// ;<UploadImg
//   getChange={(fileList) => {
//     // 获取数据
//     console.log(fileList)
//   }}
//   defaultList={[
//     {
//       url: 'https://sponsor-static.segmentfault.com/49e46fc911dd0e2f88cbe78092219807.jpeg',
//     },
//   ]}
// />
