<template>
  <div class="content" ref="contentRef">
    <div class="box-1" ref="box1Ref">
      <div class="item" ref="itemRef"></div>
    </div>
    <div class="box-2">
      <div class="item-2"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
export default {
  name: 'Test',
  setup () {
    const contentRef = ref<HTMLElement | null>(null)
    const box1Ref = ref<HTMLElement | null>(null)
    const itemRef = ref<HTMLElement | null>(null)
    onMounted(() => {
      console.log('clientWidth:' + itemRef.value.clientWidth)
      console.log('offSetWidth' + itemRef.value.offsetWidth)
      console.log('scrollWidth' + itemRef.value.scrollWidth)
      console.log('offsetTop' + itemRef.value.offsetLeft)
      console.log('scrollTop' + itemRef.value.scrollTop)
      console.log('clientTop' + itemRef.value.clientTop)
    })
    return {
      contentRef,
      box1Ref,
      itemRef
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;

  .box-1 {
    position: relative;
    width: 200px;
    height: 200px;
    background-color: pink;

    .item {
      position: absolute;
      top: 100px;
      left: 100px;
      padding: 10px;
      margin: 10px;
      border: 2px solid #333333;
      width: 100px;
      height: 100px;
      background-color: yellowgreen;
    }
  }

  .box-2 {
    height: 100px;
    width: 100px;
    background-color: red;

    .item-2 {
      height: 120px;
      width: 120px;
      background-color: #0c73c2;
    }
  }
}
</style>
