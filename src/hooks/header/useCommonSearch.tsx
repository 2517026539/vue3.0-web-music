import { getKeyWordLists } from '@/api/search'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export default function (keyWord, focusValue, router) {
  const keyWordLists = ref<any>('')
  const getKeyWordListData = async () => {
    const getLists = await getKeyWordLists({ keywords: keyWord.value })
    keyWordLists.value = getLists
  }
  const useCommonDom = () => {
    return (
      <div class={'common-list'}>
        <div class="common-title">
          <span>搜"</span>
          <span class="keyWord">{ keyWord.value }</span>
          <span>"相关结果{'>'}</span>
        </div>
        <div class="common-content">
          {
            keyWordLists.value && keyWordLists.value.order && keyWordLists.value.order.indexOf('songs') !== -1 && keyWordLists.value.songs
              ? <>
                  <h1 class="common-item-title"><i class="iconfont icondanqu"></i><span>单曲</span></h1>
                  {keyWordLists.value.songs.map(item => {
                    return <div class="common-item">
                      <span>{item.name} - {item.artistListStr}</span>
                    </div>
                  })}
                </>
              : null
          }
          {
            keyWordLists.value && keyWordLists.value.order && keyWordLists.value.order.indexOf('artists') !== -1 && keyWordLists.value.artists
              ? <>
                  <h1 class="common-item-title"><i class="iconfont iconttpodicon"></i><span>歌手</span></h1>
                  {keyWordLists.value.artists.map(item => {
                    return <div class="common-item">
                      <span>{item.name}</span>
                    </div>
                  })}
                </>
              : null
          }
          {
            keyWordLists.value && keyWordLists.value.order && keyWordLists.value.order.indexOf('albums') !== -1 && keyWordLists.value.albums
              ? <>
                  <h1 class="common-item-title"><i class="iconfont iconzhuanji"></i><span>专辑</span></h1>
                  {keyWordLists.value.albums.map(item => {
                    return <div class="common-item">
                      <span>{item.name} - {item.artistName}</span>
                    </div>
                  })}
                </>
              : null
          }
          {
            keyWordLists.value && keyWordLists.value.order && keyWordLists.value.order.indexOf('playlists') !== -1 && keyWordLists.value.playlists
              ? <>
                  <h1 class="common-item-title"><i class="iconfont icongedan"></i><span>歌单</span></h1>
                  {keyWordLists.value.playLists.map(item => {
                    return <div class="common-item">
                      <span>{item.name}</span>
                    </div>
                  })}
                </>
              : null
          }
        </div>
      </div>
    )
  }
  return {
    useCommonDom,
    getKeyWordListData
  }
}
