<template>
  <div>
    <img src="@/assets/images/stylus.png" alt="#">
    <ul>
      <li v-for="([key, value], index) of arr" :key="index">
        {{key}} : {{ value}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

export default {
  name: 'Test',
  setup () {
    const arr = new Map([[1, 2], [23, 12], [123, 235]])
    return {
      arr
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
