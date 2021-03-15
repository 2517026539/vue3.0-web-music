<template>
  <div class="header" v-if="playlistHighquality.length">
    <div class="bgc" :style='{ backgroundImage: `url(${coverImgUrl})` }'></div>
    <div class="highquality"  >
      <img class="avatar" :src="coverImgUrl" alt="#">
      <div class="right">
        <div>
          <div class="box">
            <i class="iconfont iconjingpin"></i>
            <span>精品歌单</span>
          </div>
        </div>
        <p class="title">
          {{ name }}
        </p>
        <p class="writer">{{copywriter}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, reactive, ref, watch, toRefs } from 'vue'
import { playlist } from '../../store/modules/playlists'
import { getHighquality } from '../../api/playLists'

interface HighqualityFirstItem {
  copywriter: string;
  coverImgUrl: string;
  name: string;
}

export default {
  name: 'highqualityHeader',
  setup () {
    const cat = computed(() => playlist.cat)
    let highqualityOne = reactive<HighqualityFirstItem>({
      copywriter: '',
      coverImgUrl: '',
      name: ''
    })
    const playlistHighquality = ref<any[]>([])
    watch(() => playlist.cat, async (value) => {
      const { data: { playlists } } = await getHighquality({ cat: value })
      playlistHighquality.value = playlists
      if (playlists.length) {
        const { copywriter, coverImgUrl, name } = playlists[0]
        highqualityOne = Object.assign(highqualityOne, { copywriter, coverImgUrl, name })
      } else {
        highqualityOne = Object.assign(highqualityOne, {
          copywriter: '',
          coverImgUrl: '',
          name: ''
        })
      }
    }, { immediate: true })
    return {
      playlistHighquality,
      ...toRefs(highqualityOne)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  overflow: hidden;
  border-radius: 5px;

  .bgc {
    height: 160px;
    width: 100%;
    -webkit-filter: grayscale(60%) blur(30px);
    filter: grayscale(60%) blur(30px);
  }

  .highquality {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    padding: 10px;
    align-items: center;
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
    box-sizing: border-box;

    .avatar {
      width: 140px;
      height: 140px;
      border-radius: 5px;
    }

    .right {
      flex: 1;
      display: flex;
      padding-left: 10px;
      flex-direction: column;

      .box {
        display: inline-block;
        align-items: center;
        border-radius: 13px;
        font-size: 14px;
        color: #d07312;
        border: 1px solid #d07312;
        padding: 3px 10px;
        line-height: 20px;
        height: 20px;

        >span {
          padding-left: 5px;
        }
      }

      .title {
        margin-top: 15px;
        color: #f2f3f4;
        font-size: 18px;
        font-weight: bold;
        line-height: 1.4;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
      }

      .writer {
        color: #D0D0D0;
        font-size: 12px;
        margin-top: 6px;
        line-height: 1.2;
      }
    }
  }
}
</style>
