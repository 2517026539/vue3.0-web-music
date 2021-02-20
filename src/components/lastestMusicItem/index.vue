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
  border-radius: 5px;
  position: relative;
  cursor: pointer;

  img {
    width: 48px;
    height: auto;
    border-radius: 5px;
  }

  .bofang {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 25px;
    color: #f2f3f4;
    border-radius: 50%;
  }
}

.lastest-music-item-right {
  flex: 1;
  box-sizing: border-box;
  padding-left: 12px;
  height: 48px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .music-name {
    font-size: 14px;
    padding-top: 2px;
    .music-alias {
      color: #666666;
    }
  }

  .music-item-footer {
    display: flex;
    align-items: center;
    padding-bottom: 2px;

    .music-type {
      border: 1.5px solid #ec4141;
      border-radius: 4px;
      color: #ec4141;
      font-size: 14px;
      font-weight: 600;
      margin-right: 5px;
    }

    .mv {
      cursor: pointer;
    }

    .artists-name {
      color: #676767;

      .artist-name {
        cursor: pointer;

        &:hover {
          color: #333333;
        }
      }
    }
  }
}
</style>
