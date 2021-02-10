import { AxiosResponse } from 'axios'

export const getKeyWordListFilter = (res: AxiosResponse) => {
  const { data: { result } } = res
  let albums
  let artists
  let songs
  let playLists
  if (!result) { return }
  if (result.albums && result.albums.length) {
    albums = result.albums.map(item => {
      const { id, name, artist: { name: artistName } } = item
      return {
        id,
        name,
        artistName
      }
    })
  }
  if (result.artists && result.artists.length) {
    artists = result.artists.map(item => {
      const { id, name } = item
      return {
        id,
        name
      }
    })
  }
  if (result.songs && result.songs.length) {
    songs = result.songs.map(item => {
      const { id, name, artists } = item
      const artistListStr = artists.map(item => {
        return item.name
      }).join(' ')
      return {
        id,
        name,
        artistListStr
      }
    })
  }
  if (result.playlists && result.playlists.length) {
    playLists = result.playlists.map(item => {
      const { id, name } = item
      return {
        id,
        name
      }
    })
  }
  return {
    albums,
    playLists,
    songs,
    artists,
    order: result.order
  }
}
