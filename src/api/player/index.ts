import { getRequest } from '@/api/interceptor'
import { transformSongDetail, transformSongLyric, transformComment, transformLastComment, transformSimiSong } from './translate'

const REQUEST_URL = {
  songDetail: '/song/detail',
  songLyric: '/lyric',
  songComment: '/comment/music',
  simiSong: '/simi/song'
}

export function getSongDetail (ids) {
  return getRequest(REQUEST_URL.songDetail, { ids }).then(transformSongDetail)
}

export function getSongLyric (id) {
  return getRequest(REQUEST_URL.songLyric, { id }).then(transformSongLyric)
}

export function getSongComment ({ id, limit, offset }) {
  return getRequest(REQUEST_URL.songComment, { id, limit, offset: offset * limit }).then(transformComment)
}

export function getSongLastedComment ({ id, limit, offset }) {
  return getRequest(REQUEST_URL.songComment, { id, limit, offset: offset * limit }).then(transformLastComment)
}

export function getSimiSong (id) {
  return getRequest(REQUEST_URL.simiSong, { id }).then(transformSimiSong)
}
