import { ThemeType } from '@/store/modules/theme'
import { isArray } from '@/utils/util'

export const _setThemeType = (type: string) => {
  sessionStorage.setItem('themeType', JSON.stringify(type))
}

export const _getThemeType = (type: string): ThemeType => {
  return JSON.parse(sessionStorage.getItem('themeType')) || 'red'
}

// 保存歌曲数组：最多保存30首
export const _setSongLists = (item: number | number[], id: number):void => {
  let songLists: number[] = _getSongLists()
  if (songLists.length !== 0) {
    if (isArray(item)) {
      songLists = item as number[]
    } else {
      songLists.push(item as number)
    }
  } else {
    if (isArray(item)) {
      for (let i = 0; i < (item as number[]).length; i++) {
        for (let j = 0; j < songLists.length; j++) {
          if (item[i] === songLists[j]) {
            songLists.splice(j, 1)
            break
          }
        }
      }
      songLists = songLists.concat(item)
    } else {
      for (let i = 0; i < songLists.length; i++) {
        if (item as number === songLists[i]) {
          songLists.splice(i, 1)
          break
        }
      }
      songLists.push(item as number)
    }
  }
  if (songLists.length > 30) {
    const len = songLists.length - 30
    songLists.splice(0, len)
  }
  _setSongListIndex(songLists.indexOf(id))
  sessionStorage.setItem('songLists', JSON.stringify(songLists))
}

export const _getSongLists = (): number[] => {
  return JSON.parse(sessionStorage.getItem('songLists')) || []
}

export const _setSongListIndex = (index: number):void => {
  sessionStorage.setItem('songListsIndex', JSON.stringify(index))
}

export const _getSongListIndex = (): number => {
  return JSON.parse(sessionStorage.getItem('songListsIndex')) !== null ? JSON.parse(sessionStorage.getItem('songListsIndex')) : -1
}

export const _setVolume = (volume): void => {
  sessionStorage.setItem('volume', JSON.stringify(volume))
}

export const _getVolume = (): number => {
  return JSON.parse(sessionStorage.getItem('volume')) !== null ? JSON.parse(sessionStorage.getItem('volume')) : 0.5
}

export const _setListenType = (listenType: string): void => {
  sessionStorage.setItem('listenType', JSON.stringify(listenType))
}

export const _getListenType = (): string => {
  return JSON.parse(sessionStorage.getItem('listenType')) !== null ? JSON.parse(sessionStorage.getItem('listenType')) : 'order'
}
