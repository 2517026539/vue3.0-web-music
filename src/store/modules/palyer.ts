import { getModule, Action, Mutation, VuexModule, Module } from 'vuex-module-decorators'
import { _getSongLists, _getSongListIndex, _setSongLists, _getVolume, _setVolume } from '@/utils/stroage'
import store from './../index'

const CHANGE_SONGLIST = 'changeSonglist'
const CHANGE_VOLUME = 'changeVolume'
const CHANGE_PLAYING = 'changePlaying'
const NEXT_SONG = 'nextSong'
const PRE_SONG = 'preSong'

@Module({
  name: 'player', dynamic: true, namespaced: true, store
})

class Player extends VuexModule {
  public currentIndex: number = _getSongListIndex()
  public currentSongLists: number[] = _getSongLists()
  public volume: number = _getVolume()
  public playing = false
  get isShowPlayer (): boolean {
    return this.currentSongLists.length && this.currentIndex !== -1
  }

  @Mutation
  [CHANGE_SONGLIST] ({ list, id }) {
    this.currentIndex = (list as number[]).indexOf(id)
    this.currentSongLists = list
    this.playing = true
    _setSongLists(list, id)
  }

  @Mutation
  [CHANGE_VOLUME] (volume) {
    this.volume = volume
    _setVolume(volume)
  }

  @Mutation
  [CHANGE_PLAYING] () {
    this.playing = !this.playing
  }

  @Mutation
  [NEXT_SONG] () {
    if (this.currentIndex === this.currentSongLists.length - 1) {
      this.currentIndex = 0
    } else {
      this.currentIndex = this.currentIndex + 1
    }
    this.playing = true
  }

  @Mutation
  [PRE_SONG] () {
    if (this.currentIndex === 0) {
      this.currentIndex = this.currentSongLists.length - 1
    } else {
      this.currentIndex = this.currentIndex - 1
    }
    this.playing = true
  }
}

export const player = getModule(Player)
