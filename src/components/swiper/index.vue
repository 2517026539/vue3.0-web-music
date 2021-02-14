<template>
  <div class="container">
    <div class="swiper-container ">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item of imageLists" :key="item">
          <div class="img-box">
            <img class="img-item" :src="item.imageUrl" :title="item.typeTitle" alt="#">
            <p class="img-title">{{item.typeTitle}}</p>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev left"></div>
      <div class="swiper-button-next right"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
import { ref, onMounted } from 'vue'

export default {
  name: 'index',
  props: {
    bannerLists: {
      type: Array
    }
  },
  setup (props, context) {
    onMounted(() => {
      const mySwiper = new Swiper('.swiper-container', {
        loop: true, // 是否循环
        autoplay: true, // 自动播放
        direction: 'horizontal', // Swiper滑动方向
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        effect: 'coverflow', // 切换效果：3D切换流
        slidesPerView: 2, // 设置slider容器能够同时显示的slides数量
        centeredSlides: true, // 设定为true时，active slides居中，否则默认居左
        coverflowEffect: {
          rotate: 0, // slide做3d旋转时Y轴的旋转角度
          stretch: 0, // 每个slide之间的拉伸值，越大slide靠得越紧。5.3.6 后可使用%百分比
          depth: 80, // slide的位置深度。值越大z轴距离越远，看起来越小
          modifier: 2, // depth和rotate和stretch的倍率，相当于depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显
          slideShadows: true // 是否开启slide阴影
        }
      })
    })
    const imageLists = ref(props.bannerLists)
    return {
      imageLists
    }
  }
}
</script>

<style lang="scss" scoped>
.container {

  .swiper-container {
    width: 100%;
    height: auto;
    margin: 20px auto;
    border-radius: 8px;

    .swiper-wrapper {

      .swiper-slide {
        cursor: pointer;

        .img-box {
          position: relative;
          border-radius: 8px;
          overflow: hidden;

          .img-item {
            width: 100%;
            height: 100%;
            border-radius: 8px;
          }
          .img-title {
            position: absolute;
            bottom: 5px;
            right: 1px;
            height: 15px;
            font-size: 10px;
            padding: 0 6px;
            border-radius: 8px;
            background-color: $primary-color;
            opacity: .8;
            text-align: center;
            line-height: 1.3;
          }
        }
      }
    }

    .left, .right {
      width: 20px;
      height: 20px;
      padding: 2px;
      border-radius: 50%;
      background-color: #989898;
      opacity: 0;
      text-align: center;

      &:hover {
        opacity: .8;
      }
    }

    /deep/.swiper-pagination-bullet {
      width: 6px;
      height: 6px;
    }
    /* 设置 Swiper风格 scss变量无效 */
    --swiper-pagination-color: #EC4141;
    --swiper-theme-color: #EC4141;
    --swiper-navigation-color: #eee; /* 单独设置按钮颜色 */
    --swiper-navigation-size: 16px; /* 设置按钮大小 */
  }
}
</style>
