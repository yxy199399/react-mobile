import { AllState as StroeState } from '@/store/reducers'
import URLLIST from './http/urlList'
export declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function
  }

  interface Action<T = any> {
    type: T
  }

  interface AnyAction extends Action {
    [extraProps: string]: any
  }

  interface Dispatch<A extends Action = AnyAction> {
    <T extends A>(action: T): T
  }

  type AllState = StroeState
  type Reducer<S = any, A extends Action = AnyAction> = (
    state: S | undefined,
    action: A
  ) => S

  interface UserInfo {
    username: string
  }

  interface User {
    token: string
    userInfo?: UserInfo
  }

  type UrlKeys = typeof URLLIST
  export type HttpUrlKey = keyof UrlKeys
}
