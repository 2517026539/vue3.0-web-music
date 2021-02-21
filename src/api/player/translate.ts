import { getSongDetail } from '@/api/player/index'
interface SongDetail {
  id: number,
  name: string,
  artistsList: any[],
  aliasStr: string,
  albumId: number,
  albumName: string,
  albumPicUrl: string,
  [params: string]: any
}

export const transformSongDetail = (res) => {
  const { data: { songs } } = res
  if (songs && songs.length !== 0) {
    const { name, id, ar: artists, alia, al: album } = songs[0]
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
      albumPicUrl
    } as SongDetail
  }
}
