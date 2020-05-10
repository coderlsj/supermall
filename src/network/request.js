import axios from 'axios'

export function request (config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  })
  instance.interceptors.request.use(config => {
    return config
  },error => {
  })

  instance.interceptors.response.use(res => {
    return res
  },error => {

  })
  //发送请求
  return instance(config)
}
