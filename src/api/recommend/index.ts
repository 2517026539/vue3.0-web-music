import { getRequest } from './../interceptor'
import { translateBannerData, translatePersonalized, translateOwnerSend, translateLastestMusic, translateRecommendMv } from '@/api/recommend/translate'

const REQUEST_URL = {
  banner: '/banner',
  personalized: '/personalized',
  ownerSend: '/personalized/privatecontent',
  lastestMusic: '/personalized/newsong',
  recommendedMv: '/personalized/mv'
}

export function getBanner () {
  return getRequest(REQUEST_URL.banner).then(translateBannerData)
}

export function getPersonalized () {
  return getRequest(REQUEST_URL.personalized, { limit: 10 }).then(translatePersonalized)
}

export function getOwnerSend () {
  return getRequest(REQUEST_URL.ownerSend).then(translateOwnerSend)
}

export function getLastestMusic () {
  return getRequest(REQUEST_URL.lastestMusic, { limit: 12 }).then(translateLastestMusic)
}

export function getRecommendMv () {
  return getRequest(REQUEST_URL.recommendedMv).then(translateRecommendMv)
}
