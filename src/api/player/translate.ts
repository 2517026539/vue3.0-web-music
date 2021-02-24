import { splitLyric } from '@/utils/util'

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
