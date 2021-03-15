<template>
  <div
    class="song-item-context"
    @mouseenter="handleShow"
    @mouseleave="handleHide"
    @click="handleChange"
  >
    <img :src="playlistItem.picUrl" alt="#">
    <div class="song-count">
      <i class="iconfont iconbofang"></i>
      <span class="count">{{playlistItem.playCount}}</span>
    </div>
    <div class="creator" v-if="playlistItem.userId" :title="playlistItem.nickname">
      <i class="iconfont icongeren"></i>
      <span class="creator-name">{{playlistItem.nickname}}</span>
    </div>
    <i class="iconfont icon65zanting bofang" v-show="bofang"></i>
  </div>
  <p class="song-title">{{playlistItem.name}}</p>

</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  name: 'index',
  props: {
    playlistItem: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup (props) {
    const bofang = ref<boolean>(false)
    const handleShow = () => {
      bofang.value = true
    }
    const handleHide = () => {
      bofang.value = false
    }
    const handleChange = () => {
      console.log(props.playlistItem)
    }
    return {
      handleShow,
      handleHide,
      handleChange,
      bofang
    }
  }
}
</script>

<style lang="scss" scoped>
.song-item-context {
  position: relative;
  border-radius: 5px;

  img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }

  .song-count {
    position: absolute;
    top: 5px;
    right: 5px;
    display: flex;
    color: #f2f3f4;
    align-items: center;

    .count {
      padding-left: 2px;
      font-size: 14px;
    }
  }

  .creator {
    position: absolute;
    bottom: 12px;
    left: 10px;
    font-size: 12px;
    color: #f2f3f4;
    cursor: pointer;
    display: flex;

    .creator-name {
      max-width: 60px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .bofang {
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 25px;
    color: #f2f3f4;
  }

  &:hover {
    box-shadow: 0 2px 1px #d0d0d0;
  }
}

.song-title {
  height: 45px;
  margin-top: 3px;
  overflow: hidden;
  font-size: 14px;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: normal;

  &:hover {
    color: #000001;
  }
}
</style>
