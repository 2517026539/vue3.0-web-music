<template>
    <div>
      <header>
        <Header />
      </header>
      <div class="left" :style="{ bottom : isShowPlayer ? '70px' : 0 }">
        <Aside />
      </div>
      <div class="right" :class="{cover : isCover}" :style="{ bottom : isShowPlayer ? '70px' : 0 }">
        <HeaderTabs v-if="!isCover" :tabsList="tabsList" :defaultActive="defaultActive" @tabsRouteChange="tabsRouteChange"/>
        <router-view></router-view>
      </div>
      <Player />
    </div>
</template>

<script lang="ts">
import Header from '@/layout/header/Header.vue'
import Aside from '@/layout/aside/Aside.vue'
import HeaderTabs from '@/components/header-tabs/index.vue'
import Player from '@/layout/player/index.vue'
import { defineComponent, ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TabItem from '@/components/header-tabs/type'
import { player } from '@/store/modules/palyer'

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    Aside,
    HeaderTabs,
    Player
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const isCover = ref<boolean>(false)
    const tabsList = ref<TabItem[]>([
      {
        name: '个性推荐',
        match: 'Recommend',
        path: '/recommend'
      },
      {
        name: '歌单',
        match: 'Playlists',
        path: '/playlists'
      },
      {
        name: '排行榜',
        match: 'Rank',
        path: '/rank'
      },
      {
        name: '歌手',
        match: 'Singer',
        path: '/singer'
      },
      {
        name: '最新音乐',
        match: 'LastestMusic',
        path: '/lastestmusic'
      }
    ])
    const isShowPlayer = computed(() => player.isShowPlayer)
    const defaultActive = computed(() => route.name)
    const tabsRouteChange = (path: string) => {
      router.push(path)
    }
    watch(() => route.meta, (meta) => {
      if (meta && meta.isCover && meta.isCover === true) {
        isCover.value = true
      } else {
        isCover.value = false
      }
    })
    return {
      isShowPlayer,
      isCover,
      tabsList,
      defaultActive,
      tabsRouteChange
    }
  }

})
</script>

<style lang="scss" scoped>
.left {
  position: fixed;
  top: $header-height;
  left: 0;
  width: $sidebar-width;
  padding: 15px 10px;
  border-right: 1px solid #efefef;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}

.right {
  position: fixed;
  top: $header-height;
  right: 0;
  left: $sidebar-width;
  box-sizing: border-box;
  padding-left: 30px;
  background-color: #fff;
  overflow: scroll;
}

.cover {
  padding-left: 0;
}
</style>
