import { timeTransformStr } from '@/utils/util'

export const getCommentList = (comments) => {
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
