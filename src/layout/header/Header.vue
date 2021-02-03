<template>
  <header class="header" :class="`${themeColor}-bg-primary_1`">
    <div class="header-title">
      <i class="iconfont iconmusic logo"></i>
      <span class="header-title-name">小 贤 音 乐</span>
    </div>
    <div class="header-history-left">
      <i class="iconfont iconleft left" @click="goBack"></i>
    </div>
    <div class="header-history-right">
      <i class="iconfont iconleft right"></i>
    </div>
    <div class="header-input">
      <SearchList/>
    </div>
    <div class="header-options">
      <i class="iconfont iconsetting setting"></i>
      <i class="iconfont icontheme1 theme" @click="changeThemeType"></i>
    </div>
  </header>
</template>

<script lang="ts">
import SearchList from '@/layout/header/SearchList'
import { useRouter } from 'vue-router'
import { themeStore, ThemeType } from '@/store/modules/theme'
import { ref } from 'vue'

export default {
  name: 'Header',
  components: {
    SearchList
  },
  setup () {
    const themeColor = ref<ThemeType>('red')
    const router = useRouter()
    const goBack = () => {
      router.go(-1)
    }
    const changeThemeType = () => {
      themeColor.value = themeColor.value === 'red' ? 'black' : 'red'
      themeStore.selectThemeType(themeColor.value)
    }
    return {
      goBack,
      changeThemeType,
      themeColor
    }
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
  cursor: pointer;
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
  // background-color: #ec4141;
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
  .header-options {
    color: #f2f3f4;
    .setting {
      font-size: 23px;
      font-weight: 200;
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
      margin: 0 5px;
    }
    .theme {
      font-size: 21px;
      font-weight: 200;
      color: rgba(255,255,255, .8);
      cursor: pointer;
      margin: 0 5px;
    }
  }
}
</style>
