<template>
  <header class="header">
    <div class="header-title">
      <i class="iconfont iconmusic logo"></i>
      <span class="header-title-name">小 贤 音 乐</span>
    </div>
    <div class="header-history-left">
      <i class="iconfont iconleft left"></i>
    </div>
    <div class="header-history-right">
      <i class="iconfont iconleft right"></i>
    </div>
    <div class="header-input">
      <SearchList/>
    </div>
    <div class="header-options">
      <i class="iconfont iconsetting"></i>
      <i class="iconfont icontheme1"></i>
    </div>
  </header>
</template>

<script>
import SearchList from '@/layout/header/SearchList'
export default {
  name: 'Header',
  components: {
    SearchList
  }
}
</script>

<style lang="scss" scoped>
.header-history {
  margin: 0 3px;
  border-radius: 50%;
  color: #f2f3f4;
  padding: 4px;
  font-size: 5px;
  background-color: rgba(0,0,0,.1);
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $header-height;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  background-color: #ec4141;
  align-items: center;
  .header-title {
    flex: 0 0 250px;
    box-sizing: border-box;
    padding-left: 25px;
    .logo {
      font-size: 22px;
      background-color: #f2f3f4;
      color: #ec4141;
      padding: 2px;
      border-radius: 50%;
      margin-right: 6px;
    }
    .header-title-name {
      font-size: 18px;
      color: #f2f3f4;
      font-weight: 500;
    }
  }
  .header-history-left {
    text-align: center;
    .left {
      @extend .header-history;
    }
  }
  .header-history-right {
    text-align: center;
    transform: rotate(180deg);
    .right {
      @extend .header-history;
    }
  }
}
</style>
