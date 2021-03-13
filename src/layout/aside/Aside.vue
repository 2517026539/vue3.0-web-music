<template>
  <ul>
    <li class="sidebar-main-item active"><span>发现音乐</span></li>
    <li class="sidebar-main-item"><span>视频</span></li>
    <li class="sidebar-main-item"><span>朋友</span></li>
    <li class="sidebar-main-item"><span>直播</span></li>
    <li class="sidebar-main-item"><span>私人FM</span></li>
  </ul>
  <h1 class="my-music-title sidebar-title">我的音乐</h1>
  <ul>
    <li class="sidebar-main-item">
      <i class="iconfont iconlocal sidebar-icon"></i>
      <span>本地音乐</span>
    </li>
    <li class="sidebar-main-item">
      <i class="iconfont iconxiazai_guanli sidebar-icon"></i>
      <span>下载管理</span>
    </li>
    <li class="sidebar-main-item">
      <i class="iconfont iconyinleyunpan_52 sidebar-icon"></i>
      <span>我的音乐云盘</span>
    </li>
    <li class="sidebar-main-item">
      <i class="iconfont iconshoucang sidebar-icon"></i>
      <span>我的收藏</span>
    </li>
  </ul>
  <h1 class="chuangjian-gedan sidebar-title">创建的歌单</h1>
  <ul>
    <li class="sidebar-main-item">
      <i class="iconfont iconwoxihuan sidebar-icon"></i>
      <span>我喜欢的音乐</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style lang="scss" scoped>
.active {
  font-size: 18px;
  font-weight: bold;
  background-color: #f6f6f7;
}

.sidebar-main-item {
  display: flex;
  height: 30px;
  padding-left: 5px;
  margin-bottom: 3px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  box-sizing: border-box;
  align-items: center;

  .sidebar-icon {
    flex: 0 0 25px;
  }

  &:hover {
    background-color: #f6f6f7;
  }
}

.sidebar-title {
  padding: 10px 10px 10px 12px;
  font-size: 12px;
  color: #a6a6a6;
}

</style>
