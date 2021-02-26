<template>
  <transition
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
    @after-leave="afterLeave"
    :css="false"
  >
    <div class="detail-player" ref="boxRef" v-if="isShow">
      <div class="player-header">
        <div class="left">
          <div class="left-stylus">
            <div class="stylus" :class="{ 'stylus-active': playing}"></div>
          </div>
          <div class="left-cd">
            <div class="cd" :class="{ 'cd-active': playing}">
              <img v-if="songDetails.albumPicUrl" :src="songDetails.albumPicUrl" alt="#">
            </div>
          </div>
          <div class="left-option">
            <ul>
              <li class="option-item" title="喜欢">
                <i class="iconfont iconxihuan"></i>
              </li>
              <li class="option-item" title="收藏">
                <i class="iconfont iconshoucang1"></i>
              </li>
              <li class="option-item" title="下载">
                <i class="iconfont iconxiazai"></i>
              </li>
              <li class="option-item" title="分享">
                <i class="iconfont iconfenxiang"></i>
              </li>
            </ul>
          </div>
        </div>
        <div class="right">
          <div class="right-title">
            <span>{{songDetails.name}}</span>
            <span class="song-tag" v-if="songDetails.mv">MV</span>
            <span class="song-tag">极高音质</span>
          </div>
          <div class="right-alias" v-if="songDetails.aliasStr">
            <span>{{songDetails.aliasStr.slice(1, songDetails.aliasStr.length - 1)}}</span>
          </div>
          <div class="song-info">
            <div class="song-info-item">
              <span class="attribute">专辑：</span>
              <span class="info-describe info-describe-ablume" :title="songDetails.ablumName">{{songDetails.albumName}}</span>
            </div>
            <div class="song-info-item">
              <span class="attribute">歌手：</span>
              <template v-for="item of songDetails.artistsList" :key="item">
                <span class="info-describe info-describe-songer" :title="item.name">{{item.name}}</span>
              </template>
            </div>
            <div class="song-info-item">
              <span class="attribute">来源：</span>
              <span class="info-describe" title="网易云音乐">网易云音乐</span>
            </div>
          </div>
          <div class="song-lyric" ref="lyricItemRef">
            <div class="song-lyric-item"  v-if="!noLyric">
              <template v-for="[key, value] of lyricList" :key="key">
                <div class="lyric-block" :sign="key" :class="{'lyric-active': selectLyricTime === key}">
                  <p class="lyric">{{value}}</p>
                  <p v-if="transformLyricList.get(key)" class="t-lyric">{{transformLyricList.get(key)}}</p>
                </div>
              </template>
            </div>
            <div class="nolyric" v-else>
              <span>纯音乐，请你欣赏</span>
            </div>
          </div>
        </div>
      </div>
      <div class="player-footer">
        <div class="player-footer-left">
          <Comment />
          <Page
            :total="total"
            :limit="limit"
            :offset="offset"
            @changeOffset="changeOffset"
          />
        </div>
        <div class="player-footer-right">
        </div>
      </div>
      <div class="float-block"></div>
    </div>
  </transition>
</template>

<script lang="ts">
import animationPlayer from '@/hooks/player/animationDetailPlayer'
import Comment from '@/components/comment/index.vue'
import Page from '@/components/page/index.vue'
import { player } from '@/store/modules/palyer'
import { ref, computed, nextTick, onMounted, watch } from 'vue'
export default {
  name: 'detailPlayer',
  props: {
    isShow: {
      type: Boolean
    }
  },
  components: {
    Comment,
    Page
  },
  setup () {
    const { enter, afterEnter, leave, afterLeave } = animationPlayer()
    const boxRef = ref<HTMLElement | null>(null)
    const playing = computed(() => player.playing)
    const songDetails = computed(() => player.songDetails)
    const lyricList = computed(() => player.lyricList)
    const noLyric = computed(() => player.noLyric)
    const selectLyricTime = computed(() => player.selectLyricTime)
    const transformLyricList = computed(() => player.transformLyricList)
    const lyricItemRef = ref<HTMLElement | null>(null)
    const activeLyricRef = ref<HTMLElement | null>(null)
    const total = ref<number>(500)
    const limit = ref<number>(5)
    const offset = ref<number>(0)
    const changeOffset = (num: number) => {
      offset.value = num
    }
    watch(() => player.selectLyricTime, (value) => {
      if (noLyric.value) {
        return
      }
      nextTick(() => {
        if (lyricItemRef.value) {
          const activeRef: HTMLElement = lyricItemRef.value.getElementsByClassName('song-lyric-item').item(0).getElementsByClassName('lyric-active').item(0) as HTMLElement
          const songLyricItemRef: HTMLElement = lyricItemRef.value.getElementsByClassName('song-lyric-item').item(0) as HTMLElement
          // 歌词区域父元素的height
          const lyricItemHeight = lyricItemRef.value.offsetHeight
          // 歌词区域滚动的高度
          const songLyricItemScrollHeight = lyricItemRef.value.scrollTop
          // 歌词区域实际height
          const songLyricItemHeight = songLyricItemRef.offsetHeight
          // 当前选中歌词块距离歌词区域顶部的距离top
          const activeLyricTop = activeRef.offsetTop
          if (activeLyricTop <= lyricItemHeight / 2) {
            lyricItemRef.value.scrollTop = 0
          } else if (songLyricItemHeight - activeLyricTop <= lyricItemHeight / 2) {
            lyricItemRef.value.scrollTop = songLyricItemHeight - lyricItemHeight
          } else {
            lyricItemRef.value.scrollTop = activeLyricTop - lyricItemHeight / 2
          }
        }
      })
    })
    return {
      boxRef,
      lyricItemRef,
      activeLyricRef,
      songDetails,
      lyricList,
      noLyric,
      transformLyricList,
      selectLyricTime,
      playing,
      offset,
      limit,
      total,
      enter,
      afterEnter,
      leave,
      afterLeave,
      changeOffset
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-player {
  position: fixed;
  top: $header-height;
  bottom: $player-height;
  width: 100%;
  z-index: 5;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0 14vw;
  overflow-x: hidden;
  overflow-y: scroll;

  .player-header {
    display: flex;
    flex-direction: row;

    .left {
      flex: 0 0 50%;

      .left-stylus {
        width: 100%;
        height: 60px;
        position: relative;

        .stylus {
          position: absolute;
          top: -5px;
          left: 50%;
          width: 180px;
          height: 100px;
          background-image: url('../../assets/images/stylus.png');
          background-repeat: no-repeat;
          background-size: 80% 80%;
          transform-origin: 0 0;
          transition: all 0.3s ease-in;
          z-index: 2
        }

        .stylus-active {
          transform: rotateZ(25deg);
        }
      }

      .left-cd {
        width: 100%;

        .cd {
          margin: 0 auto;
          background-image: url("../../assets/images/cover-2.png");
          background-position: -1px -5px;
          background-repeat: no-repeat;
          background-size: 100%;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #989898;

          >img {
            border-radius: 50%;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background-color: #f2f3f4;
          }
        }

        .cd-active {
          animation: cd-active 10s linear .3s infinite forwards;
        }
      }

      .left-option {
        margin-top: 20px;

        >ul {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          .option-item {
            margin: 0 30px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #e9e9e9;
            text-align: center;

            >i {
              font-size: 20px;
              line-height: 2;
            }

            &:hover {
              background-color: #d0d0d0;
            }
          }
        }
      }
    }

    .right {
      flex: 0 0 50%;
      box-sizing: border-box;
      padding-top: 10px;
      padding-left: 20px;
      padding-right: 10px;

      .right-title {
        font-size: 20px;
        margin-bottom: 15px;
        color: #313131;

        .song-tag {
          display: inline-block;
          font-size: 10px;
          color: #ec4141;
          border: 1px solid #ec4141;
          padding: 1px;
          vertical-align: baseline;
          margin-left: 8px;
          cursor: pointer;
          border-radius: 2px;
        }
      }

      .right-alias {
        font-size: 16px;
        margin-bottom: 15px;
        color: #313131;
      }

      .song-info {
        margin-bottom: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;

        .song-info-item {
          font-size: 12px;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          padding-right: 10px;
          box-sizing: border-box;
          padding-bottom: 5px;

          .attribute {
            color: #666666;
            width: 40px;
          }

          .info-describe {
            color: #0c73c2;
          }

          .info-describe-ablume {
            max-width: 100px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            cursor: pointer;
          }

          .info-describe-songer {
            max-width: 100px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            cursor: pointer;

            ~ .info-describe-songer {
              position: relative;
              margin-left: 10px;

              &:before {
                content: '|';
                display: inline-block;
                position: absolute;
                left: -10px;
                top: 50%;
                transform: translateY(-50%);
                width: 10px;
                font-size: 12px;
                text-align: center;
              }
            }
          }

        }
      }

      .song-lyric {
        overflow-x: hidden;
        overflow-y: scroll;
        height: 320px;

        .song-lyric-item {
          width: 100%;
          padding-bottom: 15px;
          position: relative;

          .lyric-block {
            margin-bottom: 20px;
            font-size: 16px;
            color: #989898;

            .lyric {}

            .t-lyric {
              padding-top: 5px;
            }
          }

          .lyric-active {
            color: #000001;
            font-size: 16px;
            font-weight: bold;
          }
        }

        .nolyric {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          color: #666666;
        }
      }
    }
  }

  .player-footer {
    display: flex;
    flex-direction: row;
    margin-top: 20px;

    .player-footer-left {
      flex: 0 0 60%;
      box-sizing: border-box;
    }

    .player-footer-right {
      flex: 0 0 40%;
      box-sizing: border-box;
    }
  }
}

@keyframes cd-active {
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
