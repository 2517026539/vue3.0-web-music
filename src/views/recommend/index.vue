<template>
  <div class="recommend" v-loading="isLoading" >
    <Swiper v-if="bannerLists.length" :bannerLists="bannerLists"/>
    <h1 class="recommend-title" @click="handleChangePlaylists">推荐歌单></h1>
    <ul class="playlist">
      <li class="playlist-item" v-for="item of personalized" :key="item.id">
        <Personalized :playlistItem="item" />
      </li>
    </ul>
    <h1 class="recommend-title" @click="handleOwner">独家放送></h1>
    <ul class="ownerSend-list">
      <li class="ownerSend-item" v-for="item of ownerSendList" :key="item">
        <OwnerSend :ownerSendData="item" />
      </li>
    </ul>
    <h1 class="recommend-title" @click="handleChangeLastestMusic">最新音乐></h1>
    <ul class="lastest-music-list">
      <li class="lastest-music-item" v-for="(item, index) of lastestMusicList" :key="item" @dblclick="selectMusic(item.id)">
        <LastestMusic :lastestMusicItemData="item" :index="index"/>
      </li>
    </ul>
    <h1 class="recommend-title" @click="handleChangeRecommendMv">推荐MV></h1>
    <ul class="recommend-mv-list">
      <li class="recommend-mv-item" v-for="item of recommendMvList" :key="item">
        <RecommendMv :recommendMvData="item"/>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swiper from '@/components/swiper/index.vue'
import Personalized from '@/components/playlistItem/index.vue'
import OwnerSend from '@/views/recommend/components/OwnerSend.vue'
import LastestMusic from '@/components/lastestMusicItem/index.vue'
import RecommendMv from './components/RecommendMv.vue'
import { player } from '@/store/modules/palyer'
import {
  getBanner,
  getPersonalized,
  getOwnerSend,
  getLastestMusic,
  getRecommendMv
} from '@/api/recommend'

export default {
  name: 'index',
  components: {
    Swiper,
    Personalized,
    OwnerSend,
    LastestMusic,
    RecommendMv
  },
  setup () {
    const router = useRouter()
    const isLoading = ref<boolean>(false)
    const bannerLists = ref<any[]>([])
    const personalized = ref<any[]>([])
    const ownerSendList = ref<any[]>([])
    const lastestMusicList = ref<any[]>([])
    const recommendMvList = ref<any[]>([])
    const init = async () => {
      isLoading.value = true
      try {
        bannerLists.value = await getBanner()
        personalized.value = await getPersonalized()
        ownerSendList.value = await getOwnerSend()
        lastestMusicList.value = await getLastestMusic()
        recommendMvList.value = await getRecommendMv()
      } catch (e) {
        // throw Error(e)
      }
      isLoading.value = false
    }

    const handleChangePlaylists = () => {
      router.push('/playlists')
    }

    const handleOwner = () => {
      console.log('独家放送')
    }

    const handleChangeLastestMusic = () => {
      router.push('/lastestmusic')
    }

    const handleChangeRecommendMv = () => {
      console.log('handleChangeRecommendMv')
    }

    // 选择播放歌曲
    const selectMusic = (id) => {
      const list = lastestMusicList.value.map(item => {
        return item.id
      })
      player.changeSonglist({ list, id })
    }

    onMounted(() => {
      init()
    })

    return {
      isLoading,
      bannerLists,
      handleChangePlaylists,
      handleOwner,
      handleChangeLastestMusic,
      handleChangeRecommendMv,
      selectMusic,
      personalized,
      ownerSendList,
      lastestMusicList,
      recommendMvList
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend-item {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.recommend {
  width: 100%;
  height: 100%;
  padding-top: 60px;
  box-sizing: border-box;
  padding-right: 30px;
  overflow-x: hidden;

  .recommend-title {
    font-size: 20px;
    font-weight: bold;
    color: #000001;
    cursor: pointer;
    margin-bottom: 15px;
    margin-top: 10px;
  }

  .playlist {
    @extend .recommend-item;

    .playlist-item {
      flex: 0 0 18.5%;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }

  .ownerSend-list {
    @extend .recommend-item;

    .ownerSend-item {
      flex: 0 0 32%;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }

  .lastest-music-list {
    @extend .recommend-item;

    .lastest-music-item {
      flex: 0 0 32.5%;
      margin-bottom: 15px;
      border-radius: 5px;
      display: flex;

      &:hover {
        background-color: #e9e9e9;
      }
    }
  }

  .recommend-mv-list {
    @extend .recommend-item;

    .recommend-mv-item {
      flex: 0 0 31%;
      margin-bottom: 10px;
      border-radius: 5px;
    }
  }
}
</style>
