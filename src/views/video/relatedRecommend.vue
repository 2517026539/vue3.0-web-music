<template>
  <ul class="related-rcm">
    <li
      v-for="item of relatedRecommend"
      :key="item"
      @dblclick="handleClickVideo(item.vid)"
    >
      <div class="left" @click="handleClickVideo(item.vid)">
        <img :src="item.coverUrl" alt="#">
        <div class="playCount">
          <i class="iconfont iconbofang"></i>
          <span>{{item.playTime}}</span>
        </div>
        <span class="time">
          {{item.durationmsStr}}
        </span>
      </div>
      <div class="right">
        <p
          @click.stop="handleClickVideo(item.vid)"
          class="title"
          :title="item.title"
        >
          {{item.title}}
        </p>
        <p class="form-creator">
          by  <template v-for="i of item.creator" :key="i">
          <span @click.stop="handleClickCreator(i.userId)" class="creator-name">{{i.userName}}</span>
        </template>
        </p>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'

export default {
  name: 'relatedRecommend',
  props: {
    relatedRecommend: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const router = useRouter()
    // 获取创建者id，并跳转到该主页界面
    const handleClickCreator = (userId) => {
      console.log(userId)
    }
    // 获取video id,并触发更新
    const handleClickVideo = (id) => {
      console.log(id)
      router.push({ name: 'video', params: { id } })
    }
    return {
      handleClickCreator,
      handleClickVideo
    }
  }
}
</script>

<style lang="scss" scoped>
.related-rcm {

  >li {
    display: flex;
    flex-direction: row;
    width: 100%;
    border-radius: 5px;
    margin-bottom: 15px;

    .left {
      position: relative;
      border-radius: 5px;
      margin-right: 10px;
      cursor: pointer;
      box-sizing: border-box;
      width: 120px;
      height: 80px;

      >img {
        width: 120px;
        height: 80px;
        border-radius: 5px;
      }

      .playCount {
        position: absolute;
        top: 5px;
        right: 5px;
        color: #e9e9e9;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 13px;

        >span {
          padding-left: 3px;
        }
      }

      .time {
        position: absolute;
        bottom: 5px;
        right: 5px;
        color: #e9e9e9;
        font-size: 13px;
      }
    }

    .right {
      flex: 1;

      .title {
        font-size: 13px;
        color: #373737;
        padding-top: 10px;
        line-height: 1.4;
        cursor: pointer;
        overflow: hidden;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }

      .form-creator {
        color: #D0D0D0;
        font-size: 12px;
        padding-top: 10px;

        .creator-name {
          cursor: pointer;
          display: inline-block;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
