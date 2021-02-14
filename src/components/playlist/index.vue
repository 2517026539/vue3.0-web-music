<template>
  <ul class="playlist">
    <li class="playlist-item" v-for="item of playlist" :key="item.id">
      <div class="song-item-context">
        <img :src="item.picUrl" alt="#">
        <div class="song-count">
          <i class="iconfont iconbofang"></i>
          <span class="count">{{item.playCount}}</span>
        </div>
      </div>
      <p class="song-title">{{item.name}}</p>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: 'index',
  props: {
    playlist: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup (props) {
    console.log(props.playlist)
  }
}
</script>

<style lang="scss" scoped>
.playlist {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  .playlist-item {
    flex: 0 0 18.5%;
    margin-bottom: 10px;
    cursor: pointer;

    .song-item-context {
      position: relative;

      img {
        width: 100%;
        height: auto;
        border-radius: 5px;
      }

      .song-count {
        position: absolute;
        top: 5px;
        right: 5px;
        color: #f2f3f4;
        display: flex;
        align-items: center;

        .count {
          padding-left: 2px;
          font-size: 14px;
        }
      }
    }

    .song-title {
      height: 45px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      font-size: 14px;
      margin-top: 3px;
      line-height: 1.2;
    }
  }
}
</style>
