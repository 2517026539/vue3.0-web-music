<template>
  <div v-if="isKongbai" class="kongbai"></div>
  <ul v-else class="page">
    <li
      class="page-item trun-rotate-180"
      @click="preOffset"
      :class="{ 'option': turnLeft}"
    >
      <i class="iconfont iconyou"></i>
    </li>
    <li
      class="page-item"
      :class="{'page-item-active': offset === 0, 'option': offset !== 0}"
      @click="changeOffset(0)"
    >
      <span>1</span>
    </li>
    <li class="page-item" :class="{ 'page-item-hidden': !left}">
      <span>...</span>
    </li>
    <li
      class="page-item"
      :class="{'page-item-active': offset + 1 === item, 'option': offset + 1 !== item}"
      v-for="item of arr"
      @click="changeOffset(item - 1)"
      :key="item"
    >
      <span>{{item}}</span>
    </li>
    <li class="page-item" :class="{ 'page-item-hidden': !right}">
      <span>...</span>
    </li>
    <li
      class="page-item"
      :class="{'page-item-active': offset === lens - 1, 'option': offset !== lens - 1}"
      @click="changeOffset(lens - 1)"
    >
      <span>{{lens}}</span>
    </li>
    <li
      class="page-item"
      @click="nextOffset"
      :class="{'option': turnRight}"
    >
      <i class="iconfont iconyou"></i>
    </li>
  </ul>
</template>

<script lang="ts">
import { ref, watchEffect, computed } from 'vue'

export default {
  name: 'index',
  props: {
    totals: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 0
    },
    offset: {
      type: Number,
      default: 0
    }
  },
  emits: ['changeOffset'],
  setup (props, context) {
    const turnLeft = ref<boolean>(false)
    const turnRight = ref<boolean>(false)
    const left = ref<boolean>(false)
    const right = ref<boolean>(false)
    const lens = computed(():number => Math.ceil(props.totals / props.limit))
    const arr = ref<any[]>([])
    const isKongbai = ref<boolean>(false)
    const changeOffset = (index) => {
      if (index !== props.offset) {
        context.emit('changeOffset', index)
      }
    }
    const nextOffset = () => {
      if (props.offset + 1 !== lens.value) {
        context.emit('changeOffset', props.offset + 1)
      }
    }
    const preOffset = () => {
      if (props.offset !== 0) {
        context.emit('changeOffset', props.offset - 1)
      }
    }
    watchEffect(() => {
      const len = Math.ceil(props.totals / props.limit)
      const offset = props.offset
      arr.value = []
      if (len <= 1) {
        isKongbai.value = true
      } else if (len > 1 && len <= 9) {
        for (let i = 1; i < len; i++) {
          if (i === 1 || i === len) {
            continue
          }
          arr.value.push(i)
        }
        left.value = false
        right.value = false
        isKongbai.value = false
        if (offset !== 0 && offset !== len - 1) {
          turnLeft.value = true
          turnRight.value = true
        } else if (offset === 0) {
          turnLeft.value = false
          turnRight.value = true
        } else {
          turnLeft.value = true
          turnRight.value = false
        }
      } else {
        isKongbai.value = false
        if (offset + 1 > 5 && offset + 1 <= len - 5) {
          for (let i = offset - 2; i <= offset + 4; i++) {
            arr.value.push(i)
          }
          left.value = true
          right.value = true
          turnLeft.value = true
          turnRight.value = true
        } else if (offset + 1 <= 5 && offset + 1 <= len - 5) {
          for (let i = 2; i <= 8; i++) {
            arr.value.push(i)
          }
          left.value = false
          right.value = true
          turnRight.value = true
          if (offset === 0) {
            turnLeft.value = false
          } else {
            turnLeft.value = true
          }
        } else {
          for (let i = len - 7; i <= len - 1; i++) {
            arr.value.push(i)
          }
          left.value = true
          right.value = false
          turnLeft.value = true
          if (offset === len - 1) {
            turnRight.value = false
          } else {
            turnRight.value = true
          }
        }
      }
    })
    return {
      turnLeft,
      turnRight,
      left,
      right,
      arr,
      lens,
      isKongbai,
      changeOffset,
      nextOffset,
      preOffset
    }
  }
}
</script>

<style lang="scss" scoped>
.kongbai {
  height: 50px;
}
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;

  .page-item {
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #D0D0D0;
    color: #313131;
    margin: 0 3px;
    cursor: default;

    .iconyou {
      font-size: 25px;
    }
  }

  .page-item-hidden {
    display: none;
  }

  .page-item-active {
    background-color: #ec4141;
    color: #f2f3f4;

    &:hover {
      background-color: #ec4141;
    }
  }

  .option {
    cursor: pointer;

    &:hover {
      background-color: #f5f5f6;
    }
  }
}

</style>
