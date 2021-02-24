import { getRequest } from '@/api/interceptor'
import { transformSongDetail, transformSongLyric } from './translate'

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

export function getSongComment (id) {
  return getRequest(REQUEST_URL.songComment, { id })
}

export function getSimiSong (id) {
  return getRequest(REQUEST_URL.simiSong, { id })
}
