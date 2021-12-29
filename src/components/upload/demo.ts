import Axios from '@/http'

export const upload = async (file: File[]) => {
  let formData = new FormData()
  file.forEach((item: File) => {
    formData.append('file', item, item.name)
  })
  const res = await Axios.post('test', formData as any, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return res
}
