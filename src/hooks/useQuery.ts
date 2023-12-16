import { useRequest, type Options, type Service } from 'vue-request'
import { cloneDeep } from 'lodash-es'
import { message } from 'ant-design-vue'

type IData<T> = {
  code: number
  data: T
  message: string
}

const useAsync = <TData, TParams extends unknown[]>(
  service: Service<IData<TData>, TParams>,
  options: Omit<Options<IData<TData>, TParams>, 'onSuccess'> & {
    failExtraFn?: () => void
    onSuccess?: (data: TData, params: TParams) => void
    needErrorMessage?: boolean
  },
  //TODO: 怎么得到函数的类型
): any => {
  let asyncOptions = cloneDeep(options || {}) as Options<IData<TData>, TParams>
  const successCallback: (data: IData<TData>, params: TParams) => void = (result, params) => {
    const res: any = result.data
    if (res?.code === 0) {
      options?.onSuccess?.(res, params)
    } else {
      options?.needErrorMessage && message.error(res.message || '系统异常')
      options?.failExtraFn?.()
    }
  }
  asyncOptions = {
    ...asyncOptions,
    onSuccess: successCallback,
  }

  return useRequest(service, asyncOptions)
}

export default useAsync
