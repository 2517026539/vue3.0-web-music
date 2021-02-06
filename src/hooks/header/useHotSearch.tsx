import { getHotSearch } from '@/api/search'
import { onMounted, ref } from 'vue'
interface HotSearch {
  searchWord: string,
  content: string,
  iconUrl: string,
  score: number,
  [params: string]: any
}

export default function (keyword, focusValue, router) {
  const hotList = ref<HotSearch>()
  const getHotList = async () => {
    const { data: { data } } = await getHotSearch()
    hotList.value = data
  }
  const clickMusicList = (searchWord: string): void => {
    keyword.value = searchWord
    focusValue.value = false
    router.push('/testview')
  }
  const hotSearchDom = () => {
    return (<div class='hot-list'>
      <h1 class='hot-title'>热搜榜</h1>
      <ul>
        {
          hotList.value.map((item, index) => {
            return (<li class='hot-li' onClick={() => { clickMusicList(item.searchWord) }}>
              <span class={ 'index ' + ((index + 1) > 3 ? '' : 'red') }>{ index + 1 }</span>
              <div class='hot-content'>
                <div class='header-content'>
                  <span class={ 'searchWord ' + ((index + 1) > 3 ? '' : 'blod') }>{ item.searchWord }</span>
                  {
                    item.iconUrl ? <img class={'img'} src={ item.iconUrl } alt="#"/> : null
                  }
                  <span class='score'>{ item.score }</span>
                </div>
                <div class="foot-content">
                  <span>{item.content}</span>
                </div>
              </div>
            </li>)
          })
        }
      </ul>
    </div>)
  }
  onMounted(() => {
    getHotList()
  })
  return {
    hotSearchDom
  }
}
