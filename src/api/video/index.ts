import { getRequest } from '../interceptor'
import { translateMvDetail, translateComment, translateLastComment, translateRelated, translateVideoDetail } from './translate'

const REQUEST_URL = {
  mvList: '/mv/all',
  mvDetail: '/mv/detail',
  // mv赞数量
  mvZan: 'mv/detail/info',
  mvUrl: '/mv/url',
  mvComment: '/comment/mv',
  videoDetail: '/video/detail',
  videoZan: '/video/detail/info',
  videoUrl: '/video/url',
  videoComment: '/comment/video',
  related: '/related/allvideo'
}

export const getMvDetail = (id) => {
  return getRequest(REQUEST_URL.mvDetail, { mvid: id }).then(translateMvDetail)
}

export const getMvUrl = (id) => {
  return getRequest(REQUEST_URL.mvUrl, { id })
}

export const getMvZan = (mvid) => {
  return getRequest(REQUEST_URL.mvZan, { mvid })
}

export const getMvComment = (id, offset = 0, limit = 20) => {
  return getRequest(REQUEST_URL.mvComment, { id, offset, limit }).then(translateComment)
}

export const getLastComment = (id, offset, limit) => {
  return getRequest(REQUEST_URL.mvComment, { id, offset, limit }).then(translateLastComment)
}

export const getRelated = (id) => {
  return getRequest(REQUEST_URL.related, { id }).then(translateRelated)
}

export const getVideoDetail = (id) => {
  return getRequest(REQUEST_URL.videoDetail, { id }).then(translateVideoDetail)
}

export const getVideoUrl = (id) => {
  return getRequest(REQUEST_URL.videoUrl, { id })
}

export const getVideoZan = (vid) => {
  return getRequest(REQUEST_URL.videoZan, { vid })
}

export const getVideoComment = (id, offset = 0, limit = 20) => {
  return getRequest(REQUEST_URL.videoComment, { id, offset, limit }).then(translateComment)
}

export const getVideoLastComment = (id, offset, limit) => {
  return getRequest(REQUEST_URL.videoComment, { id, offset, limit }).then(translateLastComment)
}
