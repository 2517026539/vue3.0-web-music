<template>
  <div class="progress-bar-item">
    <div
      class="progress-bar-content"
      ref="contentRef"
      @click="handleClickProgress"
    >
      <div class="progress-bar-done" ref="doneRef"></div>
      <div
        class="progress-bar-btn"
        ref="btnRef"
        @click="btnClick"
        @mousedown="handleMouseDown"
      ></div>
    </div>
  </div>
  <div
    class="mubo"
    :style= "{ display: isShow ? 'block' : 'none'}"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseLeave"
  >
  </div>
</template>

<script lang="ts">
import { ref, onMounted, nextTick, watchEffect, reactive } from 'vue'
export default {
  name: 'index',
  props: {
    percentage: {
      type: Number,
      default: () => 0
    }
  },
  emits: ['change'],
  setup (props, context) {
    const contentRef = ref<HTMLElement | null>(null)
    const doneRef = ref<HTMLElement | null>(null)
    const btnRef = ref<HTMLElement | null>(null)
    const contentWidth = ref<number>(0)
    const isShow = ref<boolean>(false)
    const moveData = reactive({
      isMove: false,
      startX: 0
    })
    const handleClickProgress = (e) => {
      const offSetX = e.offsetX
      doneRef.value.style.width = offSetX + 'px'
      btnRef.value.style.left = offSetX + 'px'
      context.emit('change', changePercentage(offSetX, contentWidth.value))
    }

    const changePercentage = (doneWidth: number, contentWidth: number) => {
      const percent = doneWidth / contentWidth
      return percent
    }

    const btnClick = (e) => {
      e.stopPropagation()
    }

    const handleMouseDown = (e) => {
      moveData.isMove = true
      moveData.startX = e.pageX
      isShow.value = true
    }

    const handleMouseMove = (e) => {
      e.preventDefault()
      if (moveData.isMove) {
        const len = e.pageX - moveData.startX
        const doneWidth = doneRef.value.clientWidth
        const widthAndLeft = Math.max(Math.min(doneWidth + len, contentWidth.value), 0)
        moveData.startX = e.pageX
        doneRef.value.style.width = widthAndLeft + 'px'
        btnRef.value.style.left = widthAndLeft + 'px'
        changePercentage(widthAndLeft, contentRef.value.clientWidth)
      }
    }

    const cancelMove = () => {
      moveData.isMove = false
      isShow.value = false
      const doneWidth = doneRef.value.clientWidth
      context.emit('change', changePercentage(doneWidth, contentWidth.value))
    }

    const handleMouseUp = () => {
      cancelMove()
    }

    const handleMouseLeave = () => {
      cancelMove()
    }
    watchEffect(() => {
      const percent = props.percentage
      nextTick(() => {
        contentWidth.value = contentRef.value.clientWidth
        doneRef.value.style.width = percent * contentWidth.value + 'px'
        btnRef.value.style.left = percent * contentWidth.value + 'px'
      })
    })
    onMounted(() => {
      nextTick(() => {
        contentWidth.value = contentRef.value.clientWidth
      })
    })
    return {
      contentRef,
      doneRef,
      btnRef,
      handleClickProgress,
      btnClick,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      handleMouseLeave,
      isShow
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-bar-item {

  .progress-bar-content {
    height: 5px;
    position: relative;
    width: 100%;
    border-radius: 5px;
    background-color: #e6e6e6;

    .progress-bar-done {
      border-radius: 5px;
      height: 5px;
      width: 0;
      background-color: #ff4e4e;
    }

    .progress-bar-btn {
      position: absolute;
      z-index: 3;
      height: 5px;
      width: 5px;
      border-radius: 50%;
      opacity: 0;
      background-color: #ec4141;
      top: 50%;
      transform: translate(-50%, -2.5px);

      &:hover {
        height: 10px;
        width: 10px;
        transform: translate(-50%, -5px);
        opacity: 1;
      }
    }
  }
}

.mubo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  z-index: 99;
}
</style>
