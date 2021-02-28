<template>
  <div class="simi-song" @click="$emit('changeMusic', simiSongData.id)">
    <div class="simi-left">
      <img :src="simiSongData.picUrl" alt="">
      <i class="iconfont icon65zanting"></i>
    </div>
    <div class="simi-right">
      <p class="song">
        <span class="song-name">{{simiSongData.name}}</span>
        <span class="song-alias">{{simiSongData.aliasStr}}</span>
      </p>
      <p class="singer">
        <span class="singer-name">{{simiSongData.artistsStr}}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'simiSong',
  props: {
    simiSongData: {
      type: Object,
      default: () => ({
        id: -1,
        name: '',
        picUrl: '',
        artistsStr: '',
        aliasStr: ''
      })
    }
  },
  emits: ['changeMusic']
}
</script>

<style lang="scss" scoped>
.simi-song {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 4px;

  .simi-left {
    position: relative;
    width: 45px;
    height: 45px;
    border-radius: 4px;
    background-color: #D0D0D0;
    cursor: pointer;

    >img {
      width: 45px;
      height: 45px;
      border-radius: 4px;
    }

    >i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 25px;
      color: #f2f3f4;
    }
  }

  .simi-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    padding-left: 10px;
    cursor: default;

    .song {
      font-size: 14px;
      padding-bottom: 4px;

      .song-name {
        color: #000000;
      }

      .song-alias {
        color: #989898;
      }
    }

    .singer {
      padding-top: 4px;
      font-size: 14px;
      color: #666666;
    }
  }

  &:hover {
    background-color: #e9e9e9;
  }
}
</style>
