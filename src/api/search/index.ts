import { getRequest } from '../interceptor'
import { getKeyWordListFilter } from '@/api/search/informationFilter'

export const getHotSearch = (): any => {
  return getRequest('/search/hot/detail')
}

export const getKeyWordLists = (params): any => {
  return getRequest('/search/suggest', params).then(getKeyWordListFilter)
}
