import { VuexModule, Module, Mutation, getModule, Action } from 'vuex-module-decorators'
import { _getThemeType, _setThemeType } from '@/utils/stroage'
import store from '../index'
export type ThemeType = 'black' | 'red'

@Module({ dynamic: true, namespaced: true, name: 'theme', store })
class Theme extends VuexModule {
  public themeType: ThemeType = _getThemeType('themeType')

  @Action selectThemeType (themeType: ThemeType) : void {
    _setThemeType(themeType)
    this.context.commit('THEMETYPECHANGE', themeType)
  }

  @Mutation THEMETYPECHANGE (themeType: ThemeType) : void {
    this.themeType = themeType
  }
}

export const themeStore = getModule(Theme)
