import { transformCount } from '@/utils/util'

interface Banner {
  imageUrl: string,
  [params: string]: any
}

interface Personalized {
  id: number,
  name: string,
  picUrl: string,
  playCount: string,
  [params: string]: any
}

interface OwnerSend {
  id: number,
  picUrl: string,
  name: string,
  [params: string]: any
}

interface LastestMusic {
  id: number,
  name: string,
  picUrl: string,
  artistsName: any[],
  mvid: number,
  exclusive: boolean,
  alias: string,
  [params: string]: any
}

interface RecommendMv {
  id: number,
  picUrl: string,
  name: string,
  copywriter: string,
  playCount: string,
  artists: any[],
  [params: string]: any
}

export function translateBannerData (res) {
  const { data: { banners } } = res
  if (banners) {
    return banners.map(item => {
      const { imageUrl, typeTitle } = item
      return {
        imageUrl,
        typeTitle
      } as Banner
    })
  } else {
    return undefined
  }
}

export function translatePersonalized (res) {
  const { data: { result } } = res
  if (result) {
    return result.map(item => {
      const { id, name, copywriter, picUrl, playCount: count } = item
      const playCount = transformCount(count)
      return {
        id,
        name,
        copywriter,
        picUrl,
        playCount
      } as Personalized
    })
  }
}

export function translateOwnerSend (res) {
  const { data: { result } } = res
  if (result) {
    return result.map(item => {
      const { id, name, picUrl } = item
      return {
        id,
        name,
        picUrl
      } as OwnerSend
    })
  }
}

export function translateLastestMusic (res) {
  const { data: { result } } = res
  if (result) {
    return result.map(item => {
      const {
        id,
        name,
        picUrl,
        song: {
          alias,
          artists,
          mvid,
          exclusive
        }
      } = item
      const aliasStr = alias.length !== 0 ? '(' + alias.join('/') + ')' : ''
      const artistsName = artists.map(item => {
        return {
          id: item.id,
          name: item.name
        }
      })
      const artistsNameStr = artistsName.reduce((pre, item, index) => {
        if (index < artistsName.length - 1) {
          pre = pre + item.name + '/'
        } else {
          pre = pre + item.name
        }
        return pre
      }, '')
      return {
        id,
        name,
        picUrl,
        alias: aliasStr,
        mvid,
        exclusive,
        artistsName,
        artistsNameStr
      } as LastestMusic
    })
  }
}

export function translateRecommendMv (res) {
  const { data: { result } } = res
  const recommendMvList = result.map(item => {
    const { id, name, copywriter, picUrl, playCount: count, artists } = item
    const playCount = transformCount(count)
    return {
      id,
      name,
      copywriter,
      picUrl,
      playCount,
      artists
    } as RecommendMv
  })
  recommendMvList.length = 3
  return recommendMvList
}
