import { VuexModule, Module, Mutation, getModule, Action } from 'vuex-module-decorators'
import store from '../index'
export type ThemeType = 'black' | 'red'

@Module({ dynamic: true, namespaced: true, name: 'theme', store })
class Theme extends VuexModule {
  public themeType: ThemeType = 'red'

  @Action selectThemeType (themeType: ThemeType) : void {
    this.context.commit('THEMETYPECHANGE', themeType)
  }

  @Mutation THEMETYPECHANGE (themeType: ThemeType) : void {
    this.themeType = themeType
  }
}

export const themeStore = getModule(Theme)
