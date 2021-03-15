<template>
  <div class="navigation">
    <div class="left">
      <div class="btn" id="btn" @click="changeTable">
        {{cat}}<i class="iconfont iconbottom"></i>
      </div>
      <div
        class="gedan-table"
        v-if="showTable"
        v-outside="{
          arg: 'btn',
          value: closeTable
        }"
      >
        <div class="header" @click="changeCat(allItem.name)">
          <div :class="{ 'table-active': cat === allItem.name}" class="all-btn">全部歌单</div>
        </div>
        <div class="content">
          <div class="content-item" v-for="(cate, index) of categoriesArr" :key="cate">
            <div class="content-item-left">
              <i :class="['iconfont', cates[index]]"></i>
              <span>{{cate}}</span>
            </div>
            <ul class="content-item-right">
              <li
                v-for="sub of subArr.filter(item => item.category === index)"
                :key="sub"
                @click="changeCat(sub.name)"
              >
                <div class="sub-item" :class="{ 'table-active': cat === sub.name }">
                  {{sub.name}}<i class="iconfont iconhot" v-if="sub.hot"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    <ul class="right">
      <li
        class="tags-item"
        v-for="item of hotList"
        :key="item"
        :class="{ 'active-item': cat === item.name }"
        @click="changeCat(item.name)"
      >
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { getAllCatlist, getHotCatlist } from '@/api/playLists'
import { playlist } from '@/store/modules/playlists'
import { onMounted, ref, computed, reactive } from 'vue'
export default {
  name: 'navigation',
  setup () {
    const cat = computed(() => playlist.cat)
    const hotList = ref([])
    const categoriesArr = ref([])
    const allItem = reactive({
      name: '全部歌单',
      category: -1
    })
    const cates = ref(['iconwangluo', 'iconfengge', 'iconcoffee', 'iconxiaolian', 'iconzhuti'])
    const subArr = ref([])
    const showTable = ref<boolean>(false)
    // 关闭歌单类型table
    const closeTable = () => {
      console.log('close')
      showTable.value = false
    }
    // change歌单类型table开关状态
    const changeTable = () => {
      showTable.value = !showTable.value
    }
    // change歌单类型
    const changeCat = (name) => {
      playlist.changeCat(name)
      showTable.value = false
    }
    onMounted(async () => {
      try {
        const { data: { tags } } = await getHotCatlist()
        const { data: { all, categories, sub } } = await getAllCatlist()
        for (const i in categories) {
          categoriesArr.value[i] = categories[i]
        }
        subArr.value = sub.map(item => ({
          name: item.name,
          category: item.category,
          hot: item.hot
        }))
        hotList.value = tags.map(item => ({
          name: item.name,
          category: item.category
        }))
      } catch (e) {
        console.log(e)
      }
    })
    return {
      hotList,
      subArr,
      categoriesArr,
      allItem,
      cat,
      showTable,
      cates,
      closeTable,
      changeTable,
      changeCat
    }
  }
}
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;

  .left {
    display: flex;
    align-items: center;
    position: relative;

    .btn {
      border-radius: 13px;
      border: 1px solid #e9e9e9;
      padding: 3px 8px;
      height: 20px;
      line-height: 20px;
      font-size: 16px;
      text-align: center;
      color: #353535;
      cursor: pointer;

      &:hover {
        background-color: #f8f8f9;
      }
    }

    .gedan-table {
      position: absolute;
      top: 32px;
      left: 2px;
      width: 780px;
      border-radius: 5px;
      box-shadow: -1px -1px 1px 1px #f5f5f6;
      border: 1px solid #fdf5f5;
      z-index: 6;
      background-color: #fff;

      .header {
        height: 50px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #D0D0D0;
        padding-left: 30px;
      }

      .all-btn, .sub-item {
        display: inline-block;
        padding: 5px 10px;
        font-size: 14px;
        color: #4d4d4f;
        height: 14px;
        line-height: 14px;
        text-align: center;
        border-radius: 12px;

        >i {
          color: #ec4141;
        }

        &:hover {
          color: #ec4141;
        }
      }

      .table-active {
        background-color: #fdf5f5;
        color: #ec4141;
      }

      .content {
        position: relative;
        padding: 20px 30px;
        box-sizing: border-box;

        .content-item {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          width: 100%;
          overflow: hidden;
          margin-bottom: 25px;

          .content-item-left {
            flex: 0 0 100px;
            display: flex;
            align-items: center;
            color: #d0d0d0;
            height: 30px;

            >i {
              font-size: 25px;
            }

            >span {
              font-size: 14px;
              padding-left: 4px;
            }
          }

          .content-item-right {
            flex: 1;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            line-height: 1.4;

            >li {
              flex: 0 0 120px;
              margin-bottom: 15px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .right {
    display: flex;
    flex-direction: row;
    align-items: center;

    .tags-item {
      color: #353535;
      padding: 3px 6px;
      font-size: 14px;
      cursor: default;
      height: 16px;
      line-height: 16px;
      border-radius: 11px;

      &:hover {
        color: #2b2b2b;
      }
    }

    .active-item {
      background-color: #fdf5f5;
      color: #ec4141;

      &:hover {
        color: #ec4141;
      }
    }
  }
}
</style>
