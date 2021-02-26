import { getModule, Action, Mutation, VuexModule, Module } from 'vuex-module-decorators'
import { _getSongLists, _getSongListIndex, _setSongLists, _getVolume, _setVolume, _getListenType, _setListenType } from '@/utils/stroage'
import { getSongDetail, getSongLyric, getSongComment } from '@/api/player'
import store from './../index'

const GET_SONG_LYRICLIST = 'getSongLyricList'
const GET_SONG_DETAILS = 'getSongDetails'
const GET_SONG_COMMENT = 'getSongComment'
const CHANGE_SONGLIST = 'changeSonglist'
const CHANGE_VOLUME = 'changeVolume'
const CHANGE_PLAYING = 'changePlaying'
const NEXT_SONG = 'nextSong'
const PRE_SONG = 'preSong'
const CHANGE_SONGDETAIL = 'changeSongDetail'
const CHANGE_LISTENTYPE = 'changeListenType'
const RANDOM_PLAY = 'randomPlay'
const SELECT_DANQU = 'selectDanqu'
const SELECT_LYRIC = 'selectLyric'
const CHANGE_SONG_LYRICLIST = 'changeSongLyricList'

@Module({ dynamic: true, namespaced: true, name: 'player', store })

class Player extends VuexModule {
  public currentIndex: number = _getSongListIndex()
  public currentSongLists: number[] = _getSongLists()
  public volume: number = _getVolume()
  public playing = false
  public listenTypeList = ['order', 'random', 'single']
  public selectListenType = _getListenType()
  public noLyric = false
  public transformLyricList = null
  public selectLyricTime = 0
  public lyricList = null
  public songComments = null
  public songDetails = {
    id: 0,
    name: '',
    artistsList: [],
    aliasStr: '',
    albumId: 0,
    albumName: '',
    albumPicUrl: '',
    mv: ''
  }

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
    _setSongLists(this.currentSongLists[this.currentIndex as number], this.currentSongLists[this.currentIndex as number])
    this.playing = true
  }

  @Mutation
  [PRE_SONG] () {
    if (this.currentIndex === 0) {
      this.currentIndex = this.currentSongLists.length - 1
    } else {
      this.currentIndex = this.currentIndex - 1
    }
    _setSongLists(this.currentSongLists[this.currentIndex as number], this.currentSongLists[this.currentIndex as number])
    this.playing = true
  }

  @Mutation
  [CHANGE_SONGDETAIL] (data) {
    const { songDetail } = data
    this.songDetails = songDetail
  }

  @Mutation
  [CHANGE_LISTENTYPE] (index) {
    if (index < this.listenTypeList.length - 1) {
      this.selectListenType = this.listenTypeList[index + 1]
    } else {
      this.selectListenType = this.listenTypeList[0]
    }
    _setListenType(this.selectListenType)
  }

  @Mutation
  [RANDOM_PLAY] () {
    const randomIndex = Math.floor(Math.random() * this.currentSongLists.length)
    this.currentIndex = randomIndex
    _setSongLists(this.currentSongLists[this.currentIndex as number], this.currentSongLists[this.currentIndex as number])
  }

  @Mutation
  [SELECT_DANQU] (id) {
    _setSongLists(id, id)
    this.currentSongLists = _getSongLists()
    this.currentIndex = _getSongListIndex()
    this.playing = true
  }

  @Mutation
  [SELECT_LYRIC] (time: number) {
    if (!this.noLyric) {
      let currentSelectLyricTime = 0
      for (const key of this.lyricList.keys()) {
        if (key === '') {
          return
        } else {
          if (key <= time) {
            currentSelectLyricTime = key
          } else {
            break
          }
        }
      }
      this.selectLyricTime = currentSelectLyricTime
    } else {
      this.selectLyricTime = 0
    }
  }

  @Mutation
  [CHANGE_SONG_LYRICLIST] ({ lyricList, tLyricList }) {
    if (lyricList === '') {
      this.noLyric = true
      this.lyricList = null
      this.transformLyricList = null
    } else {
      this.noLyric = false
      this.lyricList = lyricList
      this.transformLyricList = tLyricList
    }
  }

  @Action
  public async [GET_SONG_DETAILS] (ids: number) {
    const songDetail = await getSongDetail(ids)
    this.context.commit('changeSongDetail', { songDetail })
  }

  @Action
  public async [GET_SONG_LYRICLIST] (item) {
    const { lyricList, tLyricList } = await getSongLyric(item.ids)
    this.context.commit('changeSongLyricList', { lyricList, tLyricList })
    this.context.commit('selectLyric', item.time)
  }

  @Action
  public async [GET_SONG_COMMENT] (id) {
    const comments = await getSongComment(id)
    this.songComments = comments
  }
}

export const player = getModule(Player)
