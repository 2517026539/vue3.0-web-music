<template>
    <div>
      <header>
        <Header />
      </header>
      <div class="main">
        <aside class="left">
          <Aside />
        </aside>
        <div class="right">
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>

<script>
import Header from '@/layout/header/Header.vue'
import Aside from '@/layout/aside/Aside.vue'
export default {
  name: 'Home',
  components: {
    Header,
    Aside
  }
}
</script>

<style lang="scss" scoped>
.main {
  .left {
    position: fixed;
    top: $header-height;
    left: 0;
    width: $sidebar-width;
    background-color: pink;
    bottom: 0;
  }
  .right {
    position: fixed;
    top: $header-height;
    right: 0;
    left: $sidebar-width;
    bottom: 0;
    background-color: yellow;
  }
}
</style>
