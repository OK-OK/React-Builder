/*
 * @Author: JL Guan
 * @Date: 2023-12-19 14:32:00
 * @description: file description
 * @LastEditTime: 2023-12-26 11:21:49
 * @FilePath: /react-builder/src/utils/axios.ts
 */
import cookie from 'js-cookie'
import { message } from 'antd'
import axios from 'axios'
import qs from 'qs'

const initAxios = (customConfig = {}) => {
  const axiosConfig = {
    baseURL: '',
    headers: {},
    timeout: 10000,
    responseCallback: (response: any) => Promise.resolve(response),
    ...customConfig,
  }
  const instance = axios.create({
    baseURL: axiosConfig.baseURL,
    headers: axiosConfig.headers,
    timeout: axiosConfig.timeout,
  })

  instance.defaults.withCredentials = true

  instance.interceptors.request.use(
    (config: any) => {
      if (config.method == 'post' && config.data && !config.noQs) {
        for (const key in config.data) {
          const value = config.data[key]
          if (value && typeof value === 'object') {
            config.data[key] = JSON.stringify(value)
          }
        }
        config.data = qs.stringify(config.data)
      }

      return config
    },
    (err) => Promise.reject(err),
  )

  instance.interceptors.response.use(
    (response) => {
      const data = axiosConfig.responseCallback(response)
      return Promise.resolve(data)
    },
    (err) => {
      message.error(err.toString().search('timeout') ? '请求超时！' : err)
      return Promise.resolve({})
    },
  )

  return instance
}

interface Response {
  success: boolean
  errorStr: string
  data: any
  errorCode: number
}

const noLoginCode = 4001
const instance = initAxios({
  responseCallback(response: { data: Response; status: number }) {
    if (response.data.success !== undefined && !response.data.success) {
      message.error(response.data.errorStr)
      if (response.data.errorCode === noLoginCode) {
        cookie.remove('token')
        return
      }
    }
    return response.data
  },
})

export default instance
