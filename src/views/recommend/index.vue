<template>
  <div class="recommend" v-loading="isLoading" >
    <Swiper v-if="bannerLists.length" :bannerLists="bannerLists"/>
    <h1 class="recommend-title" @click="handleChangePlaylists">推荐歌单></h1>
    <Personalized v-if="personalized.length" :playlist="personalized" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swiper from '@/components/swiper/index.vue'
import Personalized from '@/components/playlist/index.vue'
import {
  getBanner,
  getPersonalized
} from '@/api/recommend'
export default {
  name: 'index',
  components: {
    Swiper,
    Personalized
  },
  setup () {
    const router = useRouter()
    const isLoading = ref<boolean>(false)
    const bannerLists = ref<any[]>([])
    const personalized = ref<any[]>([])
    const init = async () => {
      isLoading.value = true
      try {
        bannerLists.value = await getBanner()
        personalized.value = await getPersonalized()
      } catch (e) {
        // throw Error(e)
      }
      isLoading.value = false
    }

    const handleChangePlaylists = () => {
      router.push('/playlists')
    }

    onMounted(() => {
      init()
    })

    return {
      isLoading,
      bannerLists,
      handleChangePlaylists,
      personalized
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-right: 30px;
  overflow-x: hidden;
  overflow-y: scroll;

  .recommend-title {
    font-size: 20px;
    font-weight: bold;
    color: #000001;
    cursor: pointer;
    margin-bottom: 15px;
    margin-top: 10px;
  }
}
</style>
