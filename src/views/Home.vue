<template>
    <div>
      <header>
        <Header />
      </header>
      <div class="left">
        <Aside />
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
</template>

<script lang="ts">
import Header from '@/layout/header/Header.vue'
import Aside from '@/layout/aside/Aside.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    Aside
  }
})
</script>

<style lang="scss" scoped>
.left {
  position: fixed;
  top: $header-height;
  bottom: 0;
  left: 0;
  width: $sidebar-width;
  padding: 15px 10px;
  border-right: 1px solid #efefef;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}

.right {
  position: fixed;
  top: $header-height;
  right: 0;
  bottom: 0;
  left: $sidebar-width;
  background-color: yellow;
}
</style>
