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
