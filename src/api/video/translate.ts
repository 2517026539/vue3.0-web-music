import { transformTime1 } from '@/utils/util'
import { getArtistDetail } from '@/api/artists'
import { getMvZan, getVideoZan } from '@/api/video/index'
import { getCommentList } from '@/utils/comment'

export const translateMvDetail = async (res) => {
  const { data, data: { data: { commentCount, cover, desc, duration, id, artistId, artistName, artists, name, playCount, publishTime, shareCount, subCount, videoGroup } } } = res
  if (res && data) {
    const artistsList = artists.length
      ? artists.map(item => {
        return {
          id: item.id,
          name: item.name
        }
      })
      : []
    const durationStr = transformTime1(duration)
    const { data: { data: { artist: { cover: artistUrl } } } } = await getArtistDetail(artistId)
    const { data: { likedCount } } = await getMvZan(id)
    return {
      id,
      artistId,
      artistName,
      artists: artistsList,
      artistUrl,
      duration,
      durationStr,
      commentCount,
      likedCount,
      playCount,
      publishTime,
      shareCount,
      subCount,
      name,
      cover,
      desc,
      videoGroup
    } as Mv
  } else {
    return null
  }
}

export const translateComment = (res) => {
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

export const translateLastComment = (res) => {
  if (res) {
    const { data: { comments } } = res
    if (comments && comments.length) {
      const commentsList = getCommentList(comments)
      return {
        commentsList
      }
    } else {
      return {
        commentsList: []
      }
    }
  }
}

export const translateRelated = (res) => {
  const { data: { data } } = res
  if (res && data) {
    return data.map(item => {
      const { coverUrl, creator, durationms, playTime, title, vid } = item
      const durationmsStr = transformTime1(durationms)
      return {
        coverUrl,
        creator,
        durationmsStr,
        playTime,
        title,
        vid
      } as Related
    })
  } else {
    return []
  }
}

export const translateVideoDetail = async (res) => {
  const { data, data: { data: { commentCount, coverUrl: cover, description: desc, durationms, vid: id, creator, title: name, playTime: playCount, publishTime, shareCount, subscribeCount: subCount, avatarUrl: artistUrl, videoGroup } } } = res
  if (res && data) {
    const creatorList = [{ id: creator.userId, name: creator.nickname }]
    const { userId, nickname } = creator
    const durationStr = transformTime1(durationms)
    const { data: { likedCount } } = await getVideoZan(id)
    return {
      id,
      artistId: userId,
      artistName: nickname,
      artists: creatorList,
      artistUrl,
      duration: durationms,
      durationStr,
      commentCount,
      likedCount,
      playCount,
      publishTime,
      shareCount,
      subCount,
      name,
      cover,
      desc,
      videoGroup
    } as Mv
  } else {
    return null
  }
}
