import { splitLyric } from '@/utils/util'
import { getCommentList } from '@/utils/comment'

interface SongDetail {
  id: number,
  name: string,
  artistsList: any[],
  aliasStr: string,
  albumId: number,
  albumName: string,
  albumPicUrl: string,
  mv: number,
  [params: string]: any
}

interface SongLyric {
  lyricList: any,
  tLyricList: any,
  [params: string]: any
}

export const transformSongDetail = (res) => {
  const { data: { songs } } = res
  if (songs && songs.length !== 0) {
    const { name, id, ar: artists, alia, al: album, mv } = songs[0]
    const artistsList = artists.map(item => ({ id: item.id, name: item.name }))
    const aliasStr = alia.length !== 0 ? '(' + alia.join('/') + ')' : ''
    const { id: albumId, name: albumName, picUrl: albumPicUrl } = album
    return {
      id,
      name,
      artistsList,
      aliasStr,
      albumId,
      albumName,
      albumPicUrl,
      mv
    } as SongDetail
  }
}

export const transformSongLyric = (res) => {
  if ((res && res.data.nolyric) || (res && res.data.uncollected)) {
    return {
      lyricList: '',
      tLyricList: ''
    }
  } else {
    const { data: { lrc: { lyric }, tlyric: { lyric: transformLyric } } } = res
    const lyricList = splitLyric(lyric)
    const tLyricList = splitLyric(transformLyric)
    return {
      lyricList,
      tLyricList
    } as SongLyric
  }
}

export const transformComment = async (res) => {
  if (res) {
    const { data: { comments, hotComments, total } } = res
    if (comments && comments.length !== 0) {
      const commentsList = getCommentList(comments)
      const hotCommentsList = getCommentList(hotComments)
      return {
        commentsList,
        hotCommentsList,
        total
      }
    } else {
      return {
        commentsList: [],
        hotCommentsList: [],
        total: 0
      }
    }
  }
}

export const transformLastComment = (res) => {
  if (res) {
    const { data: { comments } } = res
    if (comments && comments.length !== 0) {
      const lastedComments = getCommentList(comments)
      return {
        lastedComments
      }
    } else {
      return {
        lastedComments: []
      }
    }
  }
}

export const transformSimiSong = (res) => {
  const { data: { songs } } = res
  if (songs && songs.length !== 0) {
    return songs.map(item => {
      const { album: { picUrl }, alias, id, name, artists } = item
      const aliasStr = alias.length !== 0 ? '(' + alias.join('/') + ')' : ''
      const artistsStr = artists.map(item => {
        return item.name
      }).join(' ')
      return {
        aliasStr,
        picUrl,
        id,
        name,
        artistsStr
      }
    })
  } else {
    return []
  }
}
