import { getRequest } from '@/api/interceptor'

const REQUEST_URL = {
  artistDetail: '/artist/detail'
}

export const getArtistDetail = (id) => {
  return getRequest(REQUEST_URL.artistDetail, { id })
}
