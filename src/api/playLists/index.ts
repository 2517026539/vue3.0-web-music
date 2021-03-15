import { getRequest } from '@/api/interceptor'
import { translatePlaylist } from '@/api/playLists/translate'

const REQUEST_URL = {
  detail: '/playlist/detail',
  comment: '/comment/playlist',
  allCatlist: '/playlist/catlist',
  hotCatlist: '/playlist/hot',
  topPlaylist: '/top/playlist',
  highquality: '/top/playlist/highquality'
}

export const getAllCatlist = () => {
  return getRequest(REQUEST_URL.allCatlist)
}

export const getHotCatlist = () => {
  return getRequest(REQUEST_URL.hotCatlist)
}

export const getPlaylist = (obj: { cat: string; offset?: number; limit?: number }) => {
  return getRequest(REQUEST_URL.topPlaylist, obj).then(translatePlaylist)
}

export const getHighquality = (obj: { cat: string; limit?: number }) => {
  return getRequest(REQUEST_URL.highquality, obj)
}
