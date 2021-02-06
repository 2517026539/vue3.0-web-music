import { getRequest } from '../interceptor'

export const getHotSearch = (): any => {
  return getRequest('/search/hot/detail')
}

export const getKeyWordLists = (params): any => {
  return getRequest('/search/suggest', params)
}
