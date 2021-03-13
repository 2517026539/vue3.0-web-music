<template>
  <div class="mini-player">
    <div class="left">
      <div class="song-img" @click="() => $emit('showDetailPlayer')">
        <i class="iconfont" :class="{ iconiconset0441: !isShowDetailPlayer, iconshousuo: isShowDetailPlayer }"></i>
        <img :src="picUrl" alt="">
      </div>
      <div class="name">
        <div class="song-name" :title="songName + aliasStr">
          {{songName}}
          <span class="song-name-alias">{{aliasStr}}</span>
        </div>
        <div class="artist-name" >
          <template v-for="item of artistList" :key="item.id">
            <span class="artist-item" :title="item.name">{{item.name}}</span>
          </template>
        </div>
      </div>
    </div>
    <div class="middle">
      <ul class="btn-select">
        <li class="btn-item">
          <div class="bofang-type" :style="{display: showBofangType ? 'block' : 'none'}"><span>{{listenTypeTitle}}</span></div>
          <i
            class="iconfont turn-red"
            :class="[listenTypeClass]"
            :title="listenTypeTitle"
            @click="changeBofangType"
          ></i>
        </li>
        <li class="btn-item">
          <i class="iconfont iconshangyishoushangyige turn-red" @click="preSong"></i>
        </li>
        <li class="btn-item">
          <div class="bofang" @click="clickBofang">
            <i class="iconfont icon-item" :class="{iconicon_bofang: playing, icon65zanting: !playing}"></i>
          </div>
        </li>
        <li class="btn-item">
          <i class="iconfont iconxiayigexiayishou turn-red" @click="nextSong"></i>
        </li>
        <li class="btn-item">
          <span class="song-geci turn-red">词</span>
        </li>
      </ul>
      <div class="progress-bar">
        <div class="progress-bar-time">{{startTimeStr}}</div>
        <div class="progress-bar-middle">
          <ProgressBar
            :percentage="percentage"
            @change="changeProgress"
          />
        </div>
        <div class="progress-bar-time">{{endTimeStr}}</div>
      </div>
    </div>
    <div class="right">
      <i class="iconfont iconvolume"></i>
      <div class="progress-bar-right">
        <ProgressBar
          :percentage="volume"
          @change="changeVolume"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { player } from '../../store/modules/palyer'
import ProgressBar from '@/components/progressBar/index.vue'
import { transformTime } from '@/utils/util'
import { ref, computed, nextTick } from 'vue'

export default {
  name: 'miniPlayer',
  components: {
    ProgressBar
  },
  props: {
    percentage: {
      type: Number
    },
    startTime: {
      type: Number
    },
    endTime: {
      type: Number
    },
    volume: {
      type: Number
    },
    isShowDetailPlayer: {
      type: Boolean
    }
  },
  emits: ['changeProgress', 'switchMusic', 'changeVolume', 'showDetailPlayer'],
  setup (props, context) {
    const startTimeStr = computed(() => transformTime(props.startTime))
    const endTimeStr = computed(() => transformTime(props.endTime))
    const songName = computed(() => player.songDetails.name)
    const artistList = computed(() => player.songDetails.artistsList)
    const aliasStr = computed(() => player.songDetails.aliasStr)
    const picUrl = computed(() => player.songDetails.albumPicUrl)
    const playing = computed(() => player.playing)
    const selectListenType = computed(() => player.selectListenType)
    const listenTypeTitle = computed(() => {
      switch (player.selectListenType) {
        case 'order': return '顺序播放'
        case 'random': return '随机播放'
        case 'single': return '单曲循环'
        default: return '顺序播放'
      }
    })
    const listenTypeClass = computed(() => {
      switch (player.selectListenType) {
        case 'order': return 'iconbaocunshunxu'
        case 'random': return 'iconsuijibofang01'
        case 'single': return 'iconhanhan-01-01'
        default: return 'iconbaocunshunxu'
      }
    })
    const listenTypeList = computed(() => player.listenTypeList)
    const showBofangType = ref<boolean>(false)
    const showBofangSetTime = ref(null)
    const changeVolume = (percentage) => {
      context.emit('changeVolume', percentage)
    }
    const changeProgress = (percentage) => {
      context.emit('changeProgress', percentage)
    }
    const clickBofang = () => {
      context.emit('switchMusic')
    }

    const nextSong = () => {
      player.nextSong()
    }

    const preSong = () => {
      player.preSong()
    }

    const changeBofangType = () => {
      if (showBofangSetTime.value) {
        clearTimeout(showBofangSetTime.value)
      }
      const index = listenTypeList.value.indexOf(selectListenType.value)
      player.changeListenType(index)
      showBofangType.value = true
      showBofangSetTime.value = setTimeout(() => {
        showBofangType.value = false
      }, 1000)
    }
    return {
      startTimeStr,
      endTimeStr,
      showBofangType,
      songName,
      artistList,
      aliasStr,
      picUrl,
      playing,
      listenTypeList,
      selectListenType,
      listenTypeTitle,
      listenTypeClass,
      changeVolume,
      changeProgress,
      clickBofang,
      nextSong,
      preSong,
      changeBofangType
    }
  }
}
</script>

<style lang="scss" scoped>
.mini-player {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 6;
  display: flex;
  width: 100%;
  height: $player-height;
  padding: 0 10px;
  background-color: #fff;
  box-sizing: border-box;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;

  .left {
    display: flex;
    flex: 0 0 25%;
    flex-direction: row;
    align-items: center;

    .song-img {
      position: relative;
      height: 44px;
      cursor: pointer;
      border-radius: 5px;
      flex: 0 0 44px;

      >img {
        width: 100%;
        height: 100%;
        border-radius: 5px;

      }

      >i {
        position: absolute;
        z-index: 5;
        width: 100%;
        height: 100%;
        font-size: 36px;
        line-height: 44px;
        color: #989898;
        text-align: center;
        background: rgba(7, 17, 27, 0.5);
        border-radius: 5px;
        transform: scale(0);
        transition: all .2s ease-in-out;
      }

      .iconshousuo {
        font-size: 30px;
      }

      &:hover {
        >i {
          transform: scale(1);
        }

        >img {
          filter: blur(3px);
        }
      }
    }

    .name {
      display: flex;
      margin-left: 10px;
      flex-direction: column;

      .song-name {
        display: inline-block;
        max-width: 150px;
        margin-bottom: 10px;
        overflow: hidden;
        font-size: 16px;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;

        .song-name-alias {
          color: #989898;
        }
      }

      .artist-name {
        font-size: 12px;

        .artist-item {
          padding-right: 10px;
          cursor: pointer;
        }
      }
    }
  }

  .middle {
    display: flex;
    flex: 0 0 50%;
    flex-direction: column;
    align-items: center;

    .btn-select {
      display: flex;
      height: 36px;
      margin-bottom: 2px;
      flex-direction: row;
      justify-content: center;

      .btn-item {
        position: relative;
        display: flex;
        margin: 0 12px;
        font-size: 18px;
        align-items: center;

        .bofang-type {
          position: absolute;
          top: -20px;
          left: 50%;
          display: none;
          padding: 6px 12px;
          font-size: 12px;
          color: #f2f3f4;
          background-color: rgba(77, 77, 79, 0.9);
          border-radius: 5px;
          transform: translateX(-50%);
          animation: all 0.6s ease-in-out;

          >span {
            white-space: nowrap;
          }
        }

        .bofang {
          position: relative;
          width: 36px;
          height: 36px;
          color: #000;
          cursor: pointer;
          background-color: #f5f5f6;
          border-radius: 50%;

          .icon-item {
            position: absolute;
            top: 8px;
            left: 8px;
            width: 20px;
            height: 20px;
            font-size: 20px;
            line-height: 1;
          }

          &:hover {
            background-color: #e9e9e9;
          }
        }

        .song-geci {
          font-size: 14px;
        }

        .turn-red {

          &:hover {
            color: #ec4141;
          }
        }
      }
    }

    .progress-bar {
      display: flex;
      flex-direction: row;
      justify-content: center;
      flex-wrap: nowrap;
      align-items: center;

      .progress-bar-time {
        font-size: 12px;
        color: #989898;
      }

      .progress-bar-middle {
        width: 500px;
        margin: 0 10px;
      }
    }
  }

  .right {
    display: flex;
    flex: 0 0 25%;
    flex-direction: row;
    align-items: center;

    > i {
      font-size: 18px;
    }

    .progress-bar-right {
      width: 100px;
      padding: 0 10px;
    }
  }
}
</style>
