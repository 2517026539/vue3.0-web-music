<template>
  <div class="ownerSend-content" @click="handleChange">
    <img :src="ownerSendData.picUrl" alt="#">
    <i class="iconfont icon65zanting bofang"></i>
  </div>
  <p class="ownerSend-title">
    {{ownerSendData.name}}
  </p>
</template>

<script lang="ts">
export default {
  name: 'OwnerSend',
  props: {
    ownerSendData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup (props) {
    const handleChange = () => {
      console.log(props.ownerSendData.id)
    }
    return {
      handleChange
    }
  }
}
</script>

<style lang="scss" scoped>
.ownerSend-content {
  position: relative;
  border-radius: 5px;

  img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }

  .bofang {
    position: absolute;
    top: 5px;
    left: 10px;
    font-size: 20px;
    color: #f2f3f4;
    background-color: #989898;
    border-radius: 50%;
  }
}

.ownerSend-title {
  height: 45px;
  line-height: 1.2;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
  margin-top: 5px;
}
</style>
