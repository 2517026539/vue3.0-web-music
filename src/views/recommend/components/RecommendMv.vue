<template>
  <div class="recommend-mv-content">
    <img :src="recommendMvData.picUrl" alt="#">
    <div class="recommend-mv-box">
      <i class="iconfont iconbofang bofang"></i>
      <span> {{recommendMvData.playCount}}</span>
    </div>
  </div>
  <div class="recommend-mv-title">
    <p class="recommend-mv-name">{{recommendMvData.name}}</p>
    <p>
      <span class="artist-name" v-for="item of recommendMvData.artists" :key="item">
        {{item.name}}
      </span>
    </p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'RecommendMv',
  props: {
    recommendMvData: {
      type: Object
    }
  },
  setup () {

  }
}
</script>

<style lang="scss" scoped>
.recommend-mv-content {
  position: relative;
  border-radius: 5px;
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }

  .recommend-mv-box {
    position: absolute;
    top: 5px;
    right: 8px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #fff;

    .bofang {
      color: #fff;
      font-size: 14px;
    }
  }
}

.recommend-mv-title {
  height: 45px;

  .recommend-mv-name {
    font-size: 16px;
    padding-bottom: 4px;
    padding-top: 4px;
    cursor: pointer;
  }

  .artist-name {
    font-size: 14px;
    color: #666666;
    cursor: pointer;

    &:hover {
      color: #333333;
    }
  }
}
</style>
