<template>
  <div class="recommend" v-loading="test" >
    recommend
    <input type="text" />
    <div>
      <span>{{count}}</span>
    </div>
    <span></span>
    <button @click="handleChange">
      点击加一
    </button>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  name: 'index',
  setup () {
    const count = ref<number>(1)
    const test = ref<boolean>(true)
    setTimeout(() => {
      test.value = false
      console.log(test.value)
    }, 3000)
    const handleChange = () => {
      count.value++
      test.value = true
      setTimeout(() => {
        test.value = false
      }, 3000)
    }
    return {
      count,
      test,
      handleChange
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  width: 100%;
  height: 100%;
}
</style>
