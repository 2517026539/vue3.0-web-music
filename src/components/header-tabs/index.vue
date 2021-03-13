<template>
  <ul class="header-tabs">
    <li class="header-tabs-item" :class="{active : item.match === props.defaultActive}" v-for="item of props.tabsList" :key="item.name">
      <span class="header-tabs-item-title" @click="clickHandleChange(item.path)">{{ item.name }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'

export default {
  name: 'index',
  props: {
    tabsList: Array,
    defaultActive: String
  },
  emits: ['tabsRouteChange'],
  setup (props, context) {
    const router = useRouter()
    const clickHandleChange = (path) => {
      context.emit('tabsRouteChange', path)
    }
    return {
      props,
      clickHandleChange
    }
  }
}
</script>

<style lang="scss" scoped>
.header-tabs {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  width: 100%;
  height: 60px;
  padding-left: 30px;
  background-color: #fff;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;

  .header-tabs-item {
    margin-right: 24px;
    font-size: 16px;
    color: #333;
    cursor: pointer;
  }

  .active {
    position: relative;
    font-size: 20px;
    font-weight: bold;

    &::after {
      position: absolute;
      bottom: -10px;
      left: 10%;
      display: block;
      width: 80%;
      height: 3px;
      background-color: #ec4141;
      border-radius: 3px;
      content: '';
    }
  }
}
</style>
