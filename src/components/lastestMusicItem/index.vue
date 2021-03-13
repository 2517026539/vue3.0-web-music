<template>
  <div class="lastest-music-item-left" @click="selectMusic">
    <img :src="lastestMusicItemData.picUrl" alt="#">
    <i class="iconfont icon65zanting bofang"></i>
  </div>
  <div class="lastest-music-item-right">
    <p class="music-name" :title="lastestMusicItemData.name+ ' '+lastestMusicItemData.alias">{{lastestMusicItemData.name}} <span class="music-alias">{{lastestMusicItemData.alias}}</span></p>
    <div class="music-item-footer" :title="lastestMusicItemData.artistsNameStr">
      <span class="music-type" v-if="lastestMusicItemData.exclusive">SQ</span>
      <span class="music-type mv" v-if="lastestMusicItemData.mvid">MV</span>
      <p class="artists-name">
        <span v-for="(item, index) of lastestMusicItemData.artistsName" :key="item">
          <span class="artist-name">{{item.name}}</span><span v-if="index < lastestMusicItemData.artistsName.length - 1"> / </span>
        </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'index',
  props: {
    lastestMusicItemData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    index: {
      type: Number
    }
  },
  setup (props) {
    const selectMusic = () => {
      console.log(props.index)
    }
    return {
      selectMusic
    }
  }
}
</script>

<style lang="scss" scoped>
.lastest-music-item-left {
  position: relative;
  cursor: pointer;
  border-radius: 5px;

  img {
    width: 48px;
    height: auto;
    border-radius: 5px;
  }

  .bofang {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 25px;
    color: #f2f3f4;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
}

.lastest-music-item-right {
  display: flex;
  height: 48px;
  padding-left: 12px;
  box-sizing: border-box;
  flex: 1;
  justify-content: space-between;
  flex-direction: column;

  .music-name {
    padding-top: 2px;
    font-size: 14px;

    .music-alias {
      color: #666;
    }
  }

  .music-item-footer {
    display: flex;
    padding-bottom: 2px;
    align-items: center;

    .music-type {
      margin-right: 5px;
      font-size: 14px;
      font-weight: 600;
      color: #ec4141;
      border: 1.5px solid #ec4141;
      border-radius: 4px;
    }

    .mv {
      cursor: pointer;
    }

    .artists-name {
      color: #676767;

      .artist-name {
        cursor: pointer;

        &:hover {
          color: #333;
        }
      }
    }
  }
}
</style>
