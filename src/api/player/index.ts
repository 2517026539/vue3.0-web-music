import { getRequest } from '@/api/interceptor'

const REQUEST_URL = {
  songLyric: '/lyric',
  songComment: '/comment/music',
  simiSong: '/simi/song'
}

export function getSongLyric (id) {
  return getRequest(REQUEST_URL.songLyric, {id})
}

export function getSongComment (id) {
  return getRequest(REQUEST_URL.songComment, {id})
}

export function getSimiSong (id) {
  return getRequest(REQUEST_URL.simiSong, {id})
}
