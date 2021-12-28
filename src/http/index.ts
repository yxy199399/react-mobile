import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise,
} from 'axios'
import URLLIST from './urlList'
const _axios = axios.create()
_axios.defaults.timeout = 3000
_axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
_axios.defaults.baseURL = '/api'

// 请求拦截
_axios.interceptors.request.use((config: AxiosRequestConfig<any>) => {
  // 判断token并添加到请求头
  const token = localStorage.getItem('token')
  if (token) (config.headers as any)['token'] = token
  if (config.params?.h1) {
    // config.params?.h1 请求过程操作，如显示请求中loading等
    delete config.params.h1
  }
  return config
})

// 响应拦截
_axios.interceptors.response.use(
  (res: AxiosResponse<any, any>) => {
    setTimeout(() => {
      if (res.data.code !== 200) {
        // 错误统一处理
      }
    }, 0)
    return res
  },
  (err: AxiosError) => {
    // 处理错误
    // return Promise.reject(err)
    return err
  }
)

// 根据参数获取真实路径
function initApiConfig<T extends object, K extends keyof T>(
  urlList: T,
  key: K
): T[K] {
  return urlList[key]
}

// 请求方法配置
const Axios = {
  get: (
    key: HttpUrlKey,
    params?: AxiosRequestConfig<any>
  ): AxiosPromise<any> => {
    let url: string = initApiConfig(URLLIST, key)
    // url/params 方式
    if (params?.url) url = params.url
    return _axios.get(url, params)
  },
  post: (
    key: HttpUrlKey,
    data?: AxiosRequestConfig<any>,
    config?: AxiosRequestConfig<any>
  ): AxiosPromise<any> => {
    const url: string = initApiConfig(URLLIST, key)
    return _axios.post(url, data, config)
  },
}

export default Axios
