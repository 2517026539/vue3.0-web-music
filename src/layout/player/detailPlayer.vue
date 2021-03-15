<template>
  <transition
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
    @after-leave="afterLeave"
    :css="false"
  >
    <div class="detail-player" ref="detailPlayerRef" v-if="isShow">
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
            <span class="song-tag" v-if="songDetails.mv" @click="handleChangeMv">MV</span>
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
          <h1 class="title comment-title">评论 <span class="comment-count">(已有{{totals}}条评论)</span></h1>
          <div class="comment-context">
            <p class="turn-left">
              <i class="iconfont iconbi"></i>
              <span class="comment-content-placeholder">发表评论</span>
            </p>
            <div class="turn-right">
              <i class="iconfont iconxiaolian-copy tag"></i>
              <i class="iconfont iconaite tag"></i>
            </div>
          </div>
          <HotsComment
            :hotsCommentsList="hotsCommentsList"
          />
          <Comment
            ref="commentRef"
            :totals="totals"
            :commentsList="commentsList"
          />
          <Page
            :totals="totals"
            :limit="limit"
            :offset="offset"
            @changeOffset="changeOffset"
          />
        </div>
        <div class="player-footer-right">
          <h1 class="simi-title">相似歌曲</h1>
          <template v-if="simiSongList.length !== 0">
            <SimiSong
              v-for="item of simiSongList"
              :key="item"
              :simiSongData='item'
              @changeMusic = 'changeMusic'
            />
          </template>
        </div>
      </div>
      <div class="float-block" @click="$emit('closeDetailPlayer')" title="收起音乐详情页">
        <i class="iconfont iconshousuo"></i>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import animationPlayer from '@/hooks/player/animationDetailPlayer'
import Comment from '@/components/comment/index.vue'
import HotsComment from '@/components/hotsComment/index.vue'
import SimiSong from '@/layout/player/simiSong.vue'
import Page from '@/components/page/index.vue'
import { player } from '@/store/modules/palyer'
import { ref, computed, nextTick, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'detailPlayer',
  props: {
    isShow: {
      type: Boolean
    }
  },
  emits: ['closeDetailPlayer'],
  components: {
    Comment,
    HotsComment,
    SimiSong,
    Page
  },
  setup () {
    const router = useRouter()
    const { enter, afterEnter, leave, afterLeave } = animationPlayer()
    const detailPlayerRef = ref<HTMLElement | null>(null)
    const commentRef = ref<HTMLElement | null>(null)
    const playing = computed(() => player.playing)
    const songDetails = computed(() => player.songDetails)
    const lyricList = computed(() => player.lyricList)
    const noLyric = computed(() => player.noLyric)
    const selectLyricTime = computed(() => player.selectLyricTime)
    const transformLyricList = computed(() => player.transformLyricList)
    const lyricItemRef = ref<HTMLElement | null>(null)
    const activeLyricRef = ref<HTMLElement | null>(null)
    const totals = computed(() => player.totals)
    const limit = computed(() => player.commentLimit)
    const offset = computed(() => player.commentOffset)
    const currentIndex = computed(() => player.currentIndex)
    const currentSongLists = computed(() => player.currentSongLists)
    const commentsList = computed(() => player.commentsList)
    const hotsCommentsList = computed(() => player.hotsCommentsList)
    const simiSongList = computed(() => player.simiSongList)
    const changeOffset = (num: number) => {
      player.getSongLastedComment({ id: currentSongLists.value[currentIndex.value], offset: num, limit: limit.value })
      nextTick(() => {
        // @ts-ignore
        const commentoffSetTop = commentRef.value.$el.offsetTop
        detailPlayerRef.value.scrollTop = commentoffSetTop
      })
    }
    const changeMusic = (id: number) => {
      player.selectDanqu(id)
    }
    const handleChangeMv = () => {
      router.push({ name: 'video', params: { id: songDetails.value.mv } })
    }
    watch([() => player.selectLyricTime, () => player.lyricList], (value, oldValue) => {
      if (noLyric.value) {
        return
      }
      nextTick(() => {
        if (lyricItemRef.value && lyricItemRef.value.getElementsByClassName('song-lyric-item').item(0).getElementsByClassName('lyric-active').item(0)) {
          const activeRef: HTMLElement = lyricItemRef.value.getElementsByClassName('song-lyric-item').item(0).getElementsByClassName('lyric-active').item(0) as HTMLElement
          const songLyricItemRef: HTMLElement = lyricItemRef.value.getElementsByClassName('song-lyric-item').item(0) as HTMLElement
          // 歌词区域父元素的height
          const lyricItemHeight = lyricItemRef.value.offsetHeight
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
    watch([() => player.currentIndex, () => player.currentSongLists], () => {
      if (detailPlayerRef.value) {
        detailPlayerRef.value.scrollTop = 0
      }
    })
    return {
      detailPlayerRef,
      commentRef,
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
      totals,
      commentsList,
      hotsCommentsList,
      simiSongList,
      enter,
      afterEnter,
      leave,
      afterLeave,
      changeOffset,
      changeMusic,
      handleChangeMv
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-player {
  position: fixed;
  top: $header-height;
  bottom: $player-height;
  z-index: 5;
  width: 100%;
  padding: 0 14vw;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #fff;
  box-sizing: border-box;

  .player-header {
    display: flex;
    flex-direction: row;

    .left {
      flex: 0 0 50%;

      .left-stylus {
        position: relative;
        width: 100%;
        height: 60px;

        .stylus {
          position: absolute;
          top: -5px;
          left: 50%;
          z-index: 2;
          width: 180px;
          height: 100px;
          background-image: url('../../assets/images/stylus.png');
          background-repeat: no-repeat;
          background-size: 80% 80%;
          transition: all 0.3s ease-in;
          transform-origin: 0 0;
        }

        .stylus-active {
          transform: rotateZ(25deg);
        }
      }

      .left-cd {
        width: 100%;

        .cd {
          display: flex;
          width: 300px;
          height: 300px;
          margin: 0 auto;
          background-color: #989898;
          background-image: url("../../assets/images/cover-2.png");
          background-position: -1px -5px;
          background-repeat: no-repeat;
          background-size: 100%;
          border-radius: 50%;
          justify-content: center;
          align-items: center;

          >img {
            width: 200px;
            height: 200px;
            background-color: #f2f3f4;
            border-radius: 50%;
            border-radius: 50%;
          }
        }

        .cd-active {
          animation: cd-active 10s linear .3s infinite forwards;
        }
      }

      .left-option {
        margin-top: 30px;

        >ul {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          .option-item {
            width: 40px;
            height: 40px;
            margin: 0 30px;
            text-align: center;
            background-color: #e9e9e9;
            border-radius: 50%;

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
      padding-top: 30px;
      padding-right: 10px;
      padding-left: 20px;
      box-sizing: border-box;
      flex: 0 0 50%;

      .right-title {
        margin-bottom: 15px;
        font-size: 20px;
        color: #313131;

        .song-tag {
          display: inline-block;
          padding: 1px;
          margin-left: 8px;
          font-size: 10px;
          color: #ec4141;
          vertical-align: baseline;
          cursor: pointer;
          border: 1px solid #ec4141;
          border-radius: 2px;
        }
      }

      .right-alias {
        margin-bottom: 15px;
        font-size: 16px;
        color: #313131;
      }

      .song-info {
        display: flex;
        margin-bottom: 20px;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;

        .song-info-item {
          display: flex;
          padding-right: 10px;
          padding-bottom: 5px;
          font-size: 12px;
          box-sizing: border-box;
          flex-direction: row;
          flex-wrap: nowrap;

          .attribute {
            width: 40px;
            color: #666;
          }

          .info-describe {
            color: #0c73c2;
          }

          .info-describe-ablume {
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
          }

          .info-describe-songer {
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;

            ~ .info-describe-songer {
              position: relative;
              margin-left: 10px;

              &::before {
                position: absolute;
                top: 50%;
                left: -10px;
                display: inline-block;
                width: 10px;
                font-size: 12px;
                text-align: center;
                content: '|';
                transform: translateY(-50%);
              }
            }
          }

        }
      }

      .song-lyric {
        height: 320px;
        overflow-x: hidden;
        overflow-y: scroll;

        .song-lyric-item {
          position: relative;
          width: 100%;
          padding-bottom: 15px;

          .lyric-block {
            margin-bottom: 20px;
            overflow: hidden;
            font-size: 16px;
            color: #989898;

            .lyric {
              line-height: 1.4;
            }

            .t-lyric {
              padding-top: 5px;
            }
          }

          .lyric-active {
            font-size: 16px;
            font-weight: bold;
            color: #000001;
          }
        }

        .nolyric {
          display: flex;
          width: 100%;
          height: 100%;
          font-size: 14px;
          color: #666;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  .player-footer {
    display: flex;
    margin-top: 20px;
    flex-direction: row;

    .player-footer-left {
      box-sizing: border-box;
      flex: 0 0 60%;

      .title {
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: bold;
        color: #000001;
      }

      .comment-title {
        margin-bottom: 20px;

        .comment-count {
          font-size: 12px;
          color: #d0d0d0;
        }
      }

      .comment-context {
        display: flex;
        width: 100%;
        height: 80px;
        padding: 5px;
        color: #d0d0d0;
        border: 1px solid #D0D0D0;
        border-radius: 4px;
        box-sizing: border-box;
        flex-direction: row;
        justify-content: space-between;

        .turn-left {
          font-size: 14px;
          flex: 1;
        }

        .turn-right {
          overflow: hidden;

          .tag {
            margin: 0 5px;
            font-size: 18px;
            cursor: pointer;
          }
        }
      }
    }

    .player-footer-right {
      padding-right: 10px;
      padding-left: 70px;
      box-sizing: border-box;
      flex: 0 0 40%;

      .simi-title {
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: bold;
        color: #000001;
      }
    }
  }

  .float-block {
    position: fixed;
    top: 80px;
    right: 13vw;
    display: flex;
    width: 30px;
    height: 20px;
    cursor: pointer;
    background-color: #f2f3f4;
    border: 1px solid #d0d0d0;
    border-radius: 3px;
    justify-content: center;
    align-items: center;

    >i {
      font-size: 16px;
      color: #313131;
    }
  }
}

@keyframes cd-active {
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
