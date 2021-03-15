import { Module, Action, Mutation, VuexModule, getModule } from 'vuex-module-decorators'
import store from '../index'

@Module({ name: 'playlists', dynamic: true, namespaced: true, store })

class Playlists extends VuexModule {
  public cat = '全部歌单'

  @Mutation
  changeCat (data) {
    this.cat = data
  }
}

export const playlist = getModule(Playlists)
