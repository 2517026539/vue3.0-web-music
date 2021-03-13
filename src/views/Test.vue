<template>
  <span>regexpTest</span>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'Test',
  setup () {
    const reg = ref<RegExp>(/[A-Za-z]+/g)
    console.log(reg.value.test('21213'))
  }
}
</script>

<style lang="scss" scoped>
</style>
