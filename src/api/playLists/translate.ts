import { transformCount } from '@/utils/util'

interface Playlist {
  picUrl: string;
  name: string;
  playCount: string;
  id: number;
  nickname: string;
  userId: number;
}

export const translatePlaylist = (res) => {
  const { data: { playlists, total } } = res
  if (res && playlists.length) {
    const playlistArr = playlists.map(item => ({
      picUrl: item.coverImgUrl,
      name: item.name,
      id: item.id,
      playCount: transformCount(item.playCount),
      nickname: item.creator.nickname,
      userId: item.creator.userId
    } as Playlist))
    return {
      playlists: playlistArr,
      total
    }
  } else {
    return {
      playlists: [],
      total: 0
    }
  }
}
