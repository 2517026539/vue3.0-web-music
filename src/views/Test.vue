<template>
    <div>
      <ul v-if="userList.length">
        <li v-for="(item, index) of userList" :key="index">
          <span>账号：{{item.username}}</span>
          <span>密码：{{item.password}}</span>
        </li>
      </ul>
      <button @click="addUser">点击增加</button>
    </div>
</template>

<script lang="ts">
import PassengerStore from '@/store/test'
import { getModule } from 'vuex-module-decorators'
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'Test',
  setup () {
    const store = useStore()
    const userInfoModule = getModule(PassengerStore, store)
    const userList = computed(() => {
      return userInfoModule.loginInfo
    })
    const addUser = () => {
      const userInfo: { username: string, password: string } = { username: 'xiaohua', password: '123456' }
      console.log(userInfo)
      userInfoModule.getLisi(userInfo)
    }
    console.log(userInfoModule.loginInfo)
    userInfoModule.getLisi({ username: 'xiaoxian', password: '131452' })
    console.log(userInfoModule.loginInfo)
    return {
      userList,
      addUser
    }
  }
}
</script>

<style scoped>

</style>
