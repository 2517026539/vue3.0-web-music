<template>
    <div>
        <header>
            <Header />
        </header>
    </div>
</template>

<script>
import Header from '@/layout/header/Header.vue'
export default {
  name: 'Home',
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
.home{
    width: 100%;
    height: 100px;
    background-color: #6eff6d;
}
</style>
