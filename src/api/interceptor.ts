import instance from '@/api/request'
const COOKIE = ''

instance.interceptors.response.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

export const getRequest = (url: string, params: {} = {}) => {
  return instance.get(url, {
    params: {
      ...params,
      cookie: COOKIE
    }
  })
}
