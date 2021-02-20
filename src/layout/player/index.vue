<template>
  <MiniPlayer
    v-if="isShowPlayer"
    :percentage = 'percentage'
    :startTime = 'startTime'
    :endTime = 'endTime'
    :volume="volume"
    @switchMusic='switchMusic'
    @changeProgress="changeProgress"
    @changeVolume="changeVolume"
  />
  <audio
    ref="audioRef"
    @ended="audioEnd"
    @error="audioError"
    @timeupdate="audioTimeUpdate"
    @canplay="getDuration"
  ></audio>
</template>

<script lang="ts">
import { player } from '@/store/modules/palyer'
import MiniPlayer from './miniPlayer.vue'
import { computed, ref, watch, nextTick, onMounted, reactive, toRefs } from 'vue'

export default {
  name: 'index',
  components: {
    MiniPlayer
  },
  setup () {
    const audioRef = ref<HTMLAudioElement | null>(null)
    const isShowPlayer = computed(() => player.isShowPlayer)
    const playing = computed(() => player.playing)
    const volume = computed(() => player.volume)
    const currentIndex = computed(() => player.currentIndex)
    const currentSongLists = computed(() => player.currentSongLists)
    const playerData = reactive({
      startTime: 0,
      endTime: 0,
      percentage: 0
    })
    const switchMusic = () => {
      player.changePlaying()
    }

    const changeProgress = (percentage) => {
      const startTime = percentage * playerData.endTime
      audioRef.value.currentTime = startTime
      playerData.startTime = startTime
      playerData.percentage = startTime / playerData.endTime
    }

    const changeVolume = (percentage) => {
      player.changeVolume(percentage)
      audioRef.value.volume = percentage
    }

    const getDuration = () => {
      playerData.endTime = audioRef.value.duration
      playerData.percentage = playerData.startTime / playerData.endTime
    }

    // 播放结束时，执行方法
    const audioEnd = () => {
      playerData.endTime = 0
      playerData.startTime = 0
      playerData.percentage = 0
      player.nextSong()
    }

    // 播放出错时，执行方法
    const audioError = (err) => {
      console.log(err)
    }

    // 播放时间进度更新时
    const audioTimeUpdate = () => {
      if (playing.value) {
        playerData.startTime = audioRef.value.currentTime
        playerData.percentage = playerData.startTime / playerData.endTime
      }
    }
    // oldValue 不能使用解构
    watch(() => [player.currentSongLists, player.currentIndex, player.playing], ([songLists, index, playing], oldValue) => {
      nextTick(() => {
        if (index !== -1 && (songLists as number[]).length) {
          const id = songLists[index as number]
          try {
            audioRef.value.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
            if (oldValue && oldValue[1] === index && oldValue[0] === songLists) {
              audioRef.value.currentTime = playerData.startTime
            }
            playerData.startTime = audioRef.value.currentTime
            audioRef.value.volume = volume.value
          } catch (e) {
            console.log(e)
          }
        }
        if (playing) {
          audioRef.value.play()
        } else {
          audioRef.value.pause()
        }
      })
    }, { immediate: true })

    return {
      audioRef,
      isShowPlayer,
      volume,
      switchMusic,
      audioEnd,
      audioError,
      audioTimeUpdate,
      changeProgress,
      changeVolume,
      getDuration,
      ...toRefs(playerData)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
