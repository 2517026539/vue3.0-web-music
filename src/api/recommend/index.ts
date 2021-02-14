import { getRequest } from './../interceptor'
import { translateBannerData, translatePersonalized } from '@/api/recommend/translate'

const REQUEST_URL = {
  banner: '/banner',
  personalized: '/personalized'
}

export function getBanner () {
  return getRequest(REQUEST_URL.banner).then(translateBannerData)
}

export function getPersonalized () {
  return getRequest(REQUEST_URL.personalized, { limit: 10 }).then(translatePersonalized)
}
