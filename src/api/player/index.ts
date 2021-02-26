import { getRequest } from '@/api/interceptor'
import { transformSongDetail, transformSongLyric, transformComment, transformParentComment } from './translate'

const REQUEST_URL = {
  songDetail: '/song/detail',
  songLyric: '/lyric',
  songComment: '/comment/music',
  simiSong: '/simi/song',
  parentComment: '/comment/floor'
}

export function getSongDetail (ids) {
  return getRequest(REQUEST_URL.songDetail, { ids }).then(transformSongDetail)
}

export function getSongLyric (id) {
  return getRequest(REQUEST_URL.songLyric, { id }).then(transformSongLyric)
}

export function getSongComment (id) {
  return getRequest(REQUEST_URL.songComment, { id }).then(transformComment)
}

export function getParentComment (parentCommentId, id, type) {
  return getRequest(REQUEST_URL.parentComment, { parentCommentId, id, type, limit: 1 }).then(transformParentComment)
}

export function getSimiSong (id) {
  return getRequest(REQUEST_URL.simiSong, { id })
}
