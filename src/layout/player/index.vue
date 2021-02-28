<template>
  <DetailPlayer :isShow="isShowDetailPlayer" @closeDetailPlayer="closeDetailPlayer"/>
  <MiniPlayer
    v-if="isShowPlayer"
    :percentage = 'percentage'
    :startTime = 'startTime'
    :endTime = 'endTime'
    :volume="volume"
    :isShowDetailPlayer = 'isShowDetailPlayer'
    @showDetailPlayer="showDetailPlayer"
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
import DetailPlayer from '@/layout/player/detailPlayer.vue'
import MiniPlayer from './miniPlayer.vue'
import { computed, ref, watch, nextTick, onMounted, reactive, toRefs } from 'vue'

export default {
  name: 'index',
  components: {
    DetailPlayer,
    MiniPlayer
  },
  setup () {
    const audioRef = ref<HTMLAudioElement | null>(null)
    const isShowPlayer = computed(() => player.isShowPlayer)
    const playing = computed(() => player.playing)
    const volume = computed(() => player.volume)
    // 默认偏移量
    const commentOffset = ref<number>(0)
    // 默认获取评论条数
    const commentLimit = computed(() => player.commentLimit)
    const isShowDetailPlayer = ref<boolean>(false)
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
      player.selectLyric(playerData.startTime)
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
      switch (player.selectListenType) {
        case 'order':
          player.nextSong()
          break
        case 'random':
          player.randomPlay()
          break
        case 'single':
          audioRef.value.play()
          player.selectLyric(playerData.startTime)
          break
        default:
          player.nextSong()
      }
    }

    // 播放出错时，执行方法
    const audioError = () => {
      playerData.endTime = 0
      playerData.startTime = 0
      playerData.percentage = 0
      player.nextSong()
    }

    // 播放时间进度更新时
    const audioTimeUpdate = () => {
      if (playing.value) {
        playerData.startTime = audioRef.value.currentTime
        playerData.percentage = playerData.startTime / playerData.endTime
        player.selectLyric(playerData.startTime)
      }
    }

    const showDetailPlayer = () => {
      isShowDetailPlayer.value = !isShowDetailPlayer.value
    }

    const closeDetailPlayer = () => {
      isShowDetailPlayer.value = false
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
            } else {
              player.getSongDetails(songLists[index as number])
              player.getSongLyricList({ ids: songLists[index as number], time: audioRef.value.currentTime })
              player.getSongComment({ id: songLists[index as number], offset: commentOffset.value, limit: commentLimit.value })
              player.getSimiSongList(songLists[index as number])
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
      isShowDetailPlayer,
      switchMusic,
      audioEnd,
      audioError,
      audioTimeUpdate,
      changeProgress,
      changeVolume,
      getDuration,
      showDetailPlayer,
      closeDetailPlayer,
      ...toRefs(playerData)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
