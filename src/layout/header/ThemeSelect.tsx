import { defineComponent, ref, computed } from 'vue'
import { themeStore, ThemeType } from '@/store/modules/theme'
import './index.scss'

export default defineComponent({
  emits: ['clickOutsideClose'],
  setup (props, context) {
    const themeType = computed(() => themeStore.themeType)
    const themeTypeList = ref<ThemeType[]>(['red', 'black'])
    const outsideObj = {
      value: () => {
        context.emit('clickOutsideClose')
      },
      arg: 'theme'
    }
    const selectType = (type): void => {
      themeStore.selectThemeType(type)
      context.emit('clickOutsideClose')
    }
    const themeSelect = () => {
      return <div class={ `themeSelect ${themeType.value}-theme-bg`} v-outside={ outsideObj }>
        <h1 class={'theme-title'} >主题</h1>
        <ul class={'themeList'}>
          {
            themeTypeList.value && themeTypeList.value.map(item => {
              return <li class={ 'themeItem ' + item } onClick={ () => {
                selectType(item)
              }}></li>
            })
          }
        </ul>
      </div>
    }
    return themeSelect
  }
})
