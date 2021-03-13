<template>
  <div class="video" ref="videoBoxRef">
    <div class="left">
      <h1 class="footer-title" @click="goback">
        <i class="iconfont iconleft"></i>
        <span>{{ type ? '视频详情' : 'MV详情'}}</span>
      </h1>
      <video
        ref="videoRef"
        width="600"
        height="320"
        autoplay="autoplay"
        controls="controls"
        :src="url"
        :poster="cover"
      ></video>
      <div class="song-info">
        <div class="artist-info">
          <img :src="artistUrl" class="artist-avatar" alt="?">
          <span class="artist-name">{{artistName}}</span>
        </div>
        <div class="song-title">
          <div class="song-name">
            {{name}}
            <i
              v-if="desc"
              :class="{'iconfont': true,'iconxiangxia': !showSongDesc, 'iconxiangshang': showSongDesc}"
              @click="handleClickShowDesc"
            ></i>
          </div>
          <div class="time-count">
            <span>发布：{{publishTime}}</span>
            <span>播放：{{playCount}}次</span>
          </div>
          <ul class="videoGroup" v-if="videoGroup.length">
            <li
              class="videoGroup-item"
              v-for="item of videoGroup"
              :key="item"
              @click="handleClickVideoGroup(item.id)"
            >{{item.name}}</li>
          </ul>
          <div v-show="desc !== '' && showSongDesc" class="desc">
            {{desc}}
          </div>
        </div>
      </div>
      <ul class="fun">
        <li>
          <i class="iconfont iconzan1"></i>
          <span>赞</span>
          <span>({{likedCount}})</span>
        </li>
        <li>
          <i class="iconfont iconshoucang1"></i>
          <span>收藏</span>
          <span v-if="subCount">({{subCount}})</span>
        </li>
        <li>
          <i class="iconfont iconfenxiang"></i>
          <span>分享</span>
          <span v-if="shareCount">({{shareCount}})</span>
        </li>
        <li v-if="!type">
          <i class="iconfont icondownload"></i>
          <span>下载MV</span>
        </li>
      </ul>
      <h1 class="comment-title">
        <span class="comment-text">评论</span>
        <span class="comment-count">
          ({{commentCount}})
        </span>
      </h1>
      <div class="comment">
        <textarea
          rows="4"
          maxlength="140"
        />
        <div class="comment-fun">
          <ul class="comment-left">
            <li class="comment-item">
              <i class="iconfont iconxiaolian-copy"></i>
            </li>
            <li class="comment-item">
              <i class="iconfont iconaite"></i>
            </li>
            <li class="comment-item">
              <i class="iconfont iconiconjing"></i>
            </li>
          </ul>
          <div class="comment-right">
            <button class="comment-btn">评论</button>
          </div>
        </div>
      </div>
      <HotsComment :hotsCommentsList="hotCommentsList"/>
      <Comment
        ref="commentRef"
        :totals="total"
        :commentsList="commentsList"
      />
      <Page
        :totals="total"
        :limit="limit"
        :offset="offset"
        @changeOffset="changeOffset"
      />
    </div>
    <div class="right">
      <h1 class="recommend-title">相关推荐</h1>
      <RelatedRecommend
        :relatedRecommend = 'relatedRecommend'
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { ref, nextTick, reactive, toRefs, onMounted } from 'vue'
import { player } from '@/store/modules/palyer'
import { getMvDetail, getMvUrl, getMvComment, getLastComment, getRelated, getVideoDetail, getVideoComment, getVideoLastComment, getVideoUrl } from '@/api/video/index'
import HotsComment from '@/components/hotsComment/index.vue'
import Comment from '@/components/comment/index.vue'
import Page from '@/components/page/index.vue'
import RelatedRecommend from './relatedRecommend.vue'

export default {
  name: 'index',
  components: {
    HotsComment,
    Comment,
    Page,
    RelatedRecommend
  },
  setup () {
    // @ts-ignore
    const router = useRouter()
    const route = useRoute()
    const reg = ref<RegExp>(/[a-zA-Z]+/g)
    const type = ref<number>(-1) // 0为mv类型， 1为视频类型
    let mvDetail = reactive({
      id: 0,
      name: '',
      artistId: 0,
      artistName: '',
      artistUrl: '',
      artists: [],
      duration: 0,
      durationStr: '',
      likedCount: 0,
      playCount: 0,
      shareCount: 0,
      subCount: 0,
      publishTime: '',
      desc: '',
      commentCount: 0,
      cover: '',
      videoGroup: []
    })
    let commentObj = reactive({
      commentsList: [],
      hotCommentsList: [],
      total: 0
    })
    const limit = ref<number>(20)
    const offset = ref<number>(0)
    const url = ref<string | null>(null)
    const videoBoxRef = ref<Element | null>(null)
    const commentRef = ref<Element | null>(null)
    const videoRef = ref<HTMLVideoElement | null>(null)
    const showSongDesc = ref<boolean>(false)
    const relatedRecommend = ref<any[]>([])
    const init = async (id) => {
      type.value = reg.value.test(id) ? 1 : 0
      if (!type.value) {
        const data = await getMvDetail(id)
        const comment = await getMvComment(id)
        const { data: { data: { url: mvUrl } } } = await getMvUrl(id)
        mvDetail = Object.assign(mvDetail, data)
        commentObj = Object.assign(commentObj, comment)
        url.value = mvUrl
      } else {
        const data = await getVideoDetail(id)
        const comment = await getVideoComment(id)
        const { data: { urls } } = await getVideoUrl(id)
        const videoUrl = urls.length ? urls[0].url : ''
        mvDetail = Object.assign(mvDetail, data)
        commentObj = Object.assign(commentObj, comment)
        url.value = videoUrl
      }
      relatedRecommend.value = await getRelated(id)
    }
    const handleClickShowDesc = () => {
      showSongDesc.value = !showSongDesc.value
    }
    // song类型选择
    const handleClickVideoGroup = (id) => {
      console.log('song类型id' + id)
    }
    // comment页数偏移数变化
    const changeOffset = async (num) => {
      offset.value = num
      const { commentsList } = await getLastComment(route.params.id, offset.value, limit.value)
      commentObj.commentsList = commentsList
      nextTick(() => {
        // @ts-ignore
        const commentsOffsetTop = commentRef.value.$el.offsetTop
        videoBoxRef.value.scrollTop = commentsOffsetTop
      })
    }
    // 返回上一级
    const goback = () => {
      router.go(-1)
    }

    onBeforeRouteUpdate((to) => {
      offset.value = 0
      init(to.params.id)
    })

    onMounted(() => {
      player.stopPlaying()
      init(route.params.id)
    })
    return {
      videoRef,
      commentRef,
      videoBoxRef,
      type,
      url,
      showSongDesc,
      limit,
      offset,
      relatedRecommend,
      handleClickShowDesc,
      handleClickVideoGroup,
      changeOffset,
      goback,
      ...toRefs(mvDetail),
      ...toRefs(commentObj)
    }
  }
}
</script>

<style lang="scss" scoped>
.video {
  position: fixed;
  top: $header-height;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 7;
  display: flex;
  padding: 20px 180px;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #fff;
  flex-direction: row;

  .left {
    flex: 0 0 70%;
    padding-right: 20px;
    box-sizing: border-box;

    .footer-title {
      display: flex;
      padding-bottom: 15px;
      cursor: pointer;
      align-items: center;

      > i {
        font-size: 16px;
      }

      > span {
        font-size: 18px;
        font-weight: bold;
        color: #000001;
      }
    }

    > video {
      outline: none;
    }

    .song-info {

      .artist-info {
        display: flex;
        padding-top: 15px;
        padding-bottom: 15px;
        align-items: center;

        .artist-avatar {
          width: 50px;
          height: 50px;
          cursor: pointer;
          border-radius: 50%;
        }

        .artist-name {
          padding-left: 10px;
          font-size: 14px;
          color: #333;
          cursor: pointer;
        }
      }
    }

    .song-title {
      padding-bottom: 15px;

      .song-name {
        font-size: 20px;
        font-weight: bold;
        color: #000000;
        padding: 15px 0;
        line-height: 1.2;

        > i {
          padding-left: 5px;
        }
      }

      .time-count {
        color: #d0d0d0;
        font-size: 12px;
        padding-bottom: 15px;

        span ~ span {
          padding-left: 20px;
        }
      }

      .videoGroup {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-bottom: 15px;

        .videoGroup-item {
          font-size: 12px;
          height: 20px;
          line-height: 12px;
          padding: 4px 6px;
          background-color: #f5f5f6;
          cursor: pointer;
          box-sizing: border-box;
          text-align: center;
          border-radius: 10px;
          margin-right: 10px;
        }
      }

      .desc {
        color: #2b2b2b;
        font-size: 12px;
        line-height: 1.2;
      }
    }

    .fun {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      padding-bottom: 30px;

      >li {
        display: flex;
        align-items: center;
        padding: 5px 20px;
        color: #666666;
        height: 30px;
        box-sizing: border-box;
        font-size: 16px;
        border: 1px solid #D0D0D0;
        border-radius: 14px;
        cursor: pointer;

        >i {
          padding-right: 5px;
        }

        &:hover {
          background-color: #e9e9e9;
        }
      }

      li ~ li {
        margin-left: 20px;
      }
    }

    .comment-title {
      padding-bottom: 10px;

      .comment-text {
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
      }

      .comment-count {
        font-size: 12px;
        color: #666666;
        padding-left: 3px;
      }
    }

    .comment {
      padding-bottom: 20px;

      >textarea {
        outline: none;
        width: 100%;
        border: 1px solid #D0D0D0;
        border-radius: 5px;
        resize: none;
        box-sizing: border-box;
        padding: 5px;
      }

      .comment-fun {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 5px;

        .comment-left {
          display: flex;
          align-items: center;

          .comment-item {
            display: flex;
            align-items: center;
            margin-right: 10px;
            font-size: 25px;
            cursor: pointer;
          }
        }

        .comment-right {
          display: flex;
          align-items: center;

          .comment-btn {
            padding: 5px 10px;
            font-size: 14px;
            height: 30px;
            box-sizing: border-box;
            border: 1px solid #D0D0D0;
            border-radius: 15px;
            background-color: #fff;

            &:hover {
              background-color: #f2f3f4;
            }
          }
        }
      }
    }
  }

  .right {
    flex: 0 0 30%;

    .recommend-title {
      padding-bottom: 15px;
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
