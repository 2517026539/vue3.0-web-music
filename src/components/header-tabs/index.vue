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
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  flex-direction: row;
  height: 60px;
  align-items: center;
  width: 100%;
  z-index: 3;
  background-color: #fff;
  padding-left: 30px;
  box-sizing: border-box;

  .header-tabs-item {
    font-size: 16px;
    color: #333333;
    margin-right: 24px;
    cursor: pointer;
  }

  .active {
    position: relative;
    font-size: 20px;
    font-weight: bold;
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 80%;
      height: 3px;
      left: 10%;
      bottom: -10px;
      background-color: #ec4141;
      border-radius: 3px;
    }
  }
}
</style>
