import { splitLyric, timeTransformStr } from '@/utils/util'

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

interface SongComment {
  commentId: number,
  beRepliedObj: any,
  content: string,
  likedCount: number,
  parentCommentId: number,
  timeStr: string,
  avatarUrl: string,
  nickname: string,
  userId: number,
  commentLocationType: number,
  [params: string]: any
}

const getCommentList = (comments) => {
  return comments.map(item => {
    const { commentId, beReplied, commentLocationType, content, likedCount, parentCommentId, time, user: { avatarUrl, nickname, userId } } = item
    const timeStr = timeTransformStr(time)
    const beRepliedObj = parentCommentId !== 0 ? { beRepliedCommentId: beReplied[0].beRepliedCommentId, userId: beReplied[0].user.userId, nickname: beReplied[0].user.nickname, avatarUrl: beReplied[0].user.avatarUrl, content: beReplied[0].content } : {}
    return {
      commentId,
      beRepliedObj,
      commentLocationType,
      content,
      likedCount,
      parentCommentId,
      timeStr,
      avatarUrl,
      nickname,
      userId
    } as SongComment
  })
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
  if (res && res.data.nolyric) {
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
