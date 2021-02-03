import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

type User = { username: string; password: string}

@Module({ name: 'user', namespaced: true })
export default class PassengerStore extends VuexModule {
  public loginInfo: User[] = []
  // getter
  get userNumber (): number {
    return this.loginInfo.length
  }

  // mutation
  @Mutation USERINFO (user: User): void {
    console.log(user)
    this.loginInfo.push(user)
  }

  // commit的两种调用方式,第一种,Action后面的括号里面添加commit,然后return的结果就是USERINFO的参数
  @Action getLisi (user: User): void {
    this.context.commit('USERINFO', user)
  }
}
