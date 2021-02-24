<template>
  <header class="header" :class="`${themeColor}-bg-primary_1`">
    <div class="header-title">
      <i class="iconfont iconmusic logo" :class="`${themeColor}-color-primary_1`"></i>
      <span class="header-title-name" >小 贤 音 乐</span>
    </div>
    <div class="header-history-left">
      <i class="iconfont iconleft left" :class="`${themeColor}-his-bg`" @click="goBack"></i>
    </div>
    <div class="header-history-right">
      <i class="iconfont iconleft right" :class="`${themeColor}-his-bg`"></i>
    </div>
    <div class="header-input">
      <SearchList/>
    </div>
    <div class="header-options">
      <i class="iconfont iconsetting setting"></i>
      <i class="iconfont icontheme1 theme" id="theme" @click="showThemeSelect"></i>
      <template v-if="showTheme">
        <ThemeSelect @clickOutsideClose="clickOutsideClose"/>
      </template>
    </div>
  </header>
</template>

<script lang="ts">
import SearchList from '@/layout/header/SearchList'
import ThemeSelect from '@/layout/header/ThemeSelect'
import { useRouter } from 'vue-router'
import { themeStore } from '@/store/modules/theme'
import { computed, ref } from 'vue'

export default {
  name: 'Header',
  components: {
    SearchList,
    ThemeSelect
  },
  setup () {
    const showTheme = ref<boolean>(false)
    const themeColor = computed(() => themeStore.themeType)
    const router = useRouter()
    const goBack = (): void => {
      router.go(-1)
    }
    const showThemeSelect = (): void => {
      showTheme.value = !showTheme.value
    }
    const clickOutsideClose = (): void => {
      console.log(1)
      showTheme.value = false
    }
    return {
      goBack,
      themeColor,
      showTheme,
      showThemeSelect,
      clickOutsideClose
    }
  }
}
</script>

<style lang="scss" scoped>
.header-history {
  padding: 4px;
  margin: 0 3px;
  font-size: 14px;
  color: #f2f3f4;
  cursor: pointer;
  border-radius: 50%;
}

.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 6;
  display: flex;
  height: $header-height;
  flex-wrap: nowrap;
  flex-direction: row;
  // background-color: #ec4141;
  align-items: center;

  .header-title {
    padding-left: 25px;
    box-sizing: border-box;
    flex: 0 0 250px;

    .logo {
      padding: 2px;
      margin-right: 6px;
      font-size: 22px;
      background-color: #f2f3f4;
      border-radius: 50%;
    }

    .header-title-name {
      font-size: 18px;
      font-weight: 500;
      color: #f2f3f4;
    }
  }

  .header-history-left {
    text-align: center;

    .left {
      @extend .header-history;
    }
  }

  .header-history-right {
    margin-right: 10px;
    text-align: center;
    transform: rotate(180deg);

    .right {
      @extend .header-history;
    }
  }

  .header-options {
    position: relative;
    color: #f2f3f4;

    .setting {
      margin: 0 5px;
      font-size: 23px;
      font-weight: 200;
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
    }

    .theme {
      margin: 0 5px;
      font-size: 21px;
      font-weight: 200;
      color: rgba(255,255,255, .8);
      cursor: pointer;
    }
  }
}
</style>
