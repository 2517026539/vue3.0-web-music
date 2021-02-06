import { defineComponent, ref, computed, watch } from 'vue'
import { debounce } from '@/utils/util'
import { themeStore } from '@/store/modules/theme'
import useCommonSearch from '@/hooks/header/useCommonSearch'
import useHotSearch from '@/hooks/header/useHotSearch'
import { getKeyWordLists } from '@/api/search'
import './index.scss'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const themeType = computed(() => themeStore.themeType)
    const focusValue = ref<boolean>(false)
    const keyWords = ref<string>('')
    const router = useRouter()
    const { hotSearchDom } = useHotSearch(keyWords, focusValue, router)
    const { useCommonDom } = useCommonSearch(keyWords, focusValue, router)
    const getFocus = ():void => {
      focusValue.value = true
    }
    watch(keyWords, debounce(async () => {
      const getLists = getKeyWordLists({keywords: keyWords.value})
      console.log(getLists)
    }, 1000))
    const clickOutside = {
      value: () => {
        focusValue.value = false
      },
      arg: 'search-input'
    }

    const boxCard = () => {
      return <div class="list-card" v-outside={clickOutside}>
        {
          keyWords.value === ''
            ? hotSearchDom()
            : useCommonDom()
        }
      </div>
    }
    return () => (
      <div class="header-search">
        <input
          id="search-input"
          type="text"
          placeholder={'搜索'}
          v-model={ keyWords.value }
          class={`search ${themeType.value}-in-bg ${themeType.value}-in-color`}
          onFocus={getFocus}
        />
        <i class="iconfont iconsw_sousuo icon-search"></i>
        {
          focusValue.value ? boxCard() : null
        }
      </div>
    )
  }
})
