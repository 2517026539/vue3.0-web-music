<template>
  <div class="playlist" v-loading="loading" ref="playlistRef">
    <HighqualityHeader/>
    <Navigation/>
    <ul class="playlist-content">
      <li class="playlist-item" v-for="item of playlists" :key="item.id">
        <PlaylistItem :playlistItem = 'item'/>
      </li>
    </ul>
    <Page
      :limit="limit"
      :totals = 'total'
      :offset = 'offset'
      @changeOffset="changeOffset"
    />
  </div>
</template>

<script lang="ts">
import HighqualityHeader from './highqualityHeader.vue'
import Navigation from '@/views/playlists/navigation.vue'
import { playlist } from '@/store/modules/playlists'
import { computed, onMounted, watch, ref } from 'vue'
import { getPlaylist } from '@/api/playLists'
import PlaylistItem from '@/components/playlistItem/index.vue'
import Page from '@/components/page/index.vue'

export default {
  name: 'index',
  components: {
    HighqualityHeader,
    Navigation,
    PlaylistItem,
    Page
  },
  setup () {
    const loading = ref<boolean>(false)
    const cat = computed(() => playlist.cat)
    const total = ref<number>(0)
    const limit = ref<number>(50)
    const offset = ref<number>(0)
    const playlists = ref<any[]>([])
    const playlistRef = ref<Element | null>(null)
    const changeOffset = async (number) => {
      offset.value = number
      // @ts-ignore
      playlistRef.value.scrollTop = 0
      loading.value = true
      try {
        const { playlists: playlistsArr, total: totals } = await getPlaylist({ cat: cat.value, limit: limit.value, offset: offset.value * limit.value })
        total.value = totals
        playlists.value = playlistsArr
      } catch (e) {
        console.log(e)
      }
      loading.value = false
    }
    watch(() => playlist.cat, async (value) => {
      loading.value = true
      offset.value = 0
      try {
        const { playlists: playlistsArr, total: totals } = await getPlaylist({ cat: value, limit: limit.value, offset: offset.value * limit.value })
        total.value = totals
        playlists.value = playlistsArr
      } catch (e) {
        console.log(e)
      }
      loading.value = false
    }, {
      immediate: true
    })
    return {
      playlistRef,
      playlists,
      loading,
      total,
      limit,
      offset,
      changeOffset
    }
  }
}
</script>

<style lang="scss" scoped>
.playlist {
  padding-top: 60px;
  padding-right: 40px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;

  .playlist-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    z-index: 5;

    .playlist-item {
      flex: 0 0 18.5%;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }
}
</style>
