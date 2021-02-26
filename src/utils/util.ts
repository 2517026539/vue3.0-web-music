/* 防抖函数 */
export const debounce = function (fun: any, wait: number) {
  let time = null
  const debounced = (...rest): void => {
    const args = rest

    if (!time) {
      time = setTimeout(() => {
        // @ts-ignore
        fun.apply(this, args)
      }, wait)
    } else {
      clearTimeout(time)
      time = setTimeout(() => {
        fun(args)
      }, wait)
    }
  }
  return debounced
}

/* 人气数表示转化 */
export const transformCount = (count): string => {
  const BASE = 10000
  const MAX = 100000
  if (count >= MAX) {
    const playCount = Math.floor(count / BASE) + '万'
    return playCount
  } else {
    return count.toString()
  }
}

/* 检验是否为数组 */
export const isArray = (item) => {
  return Object.prototype.toString.call(item) === '[object Array]'
}

/* 时间转化 */
export const transformTime = (time:number):string => {
  // 时间只转化到分钟
  const minute:string = Math.floor(time / 60).toString().padStart(2, '0')
  const second:string = Math.floor((time - Math.floor(time / 60) * 60)).toString().padStart(2, '0')
  return minute + ':' + second
}

/* 字符串转化时间 */
export const strTransformTime = (time: string): number => {
  // 00:00.000 或者 00:00.00
  const minute = Number(time.slice(0, 2))
  const second = Number(time.slice(3))
  const allTime = minute * 60 + second
  return allTime
}

/* 分割歌词字符串 */
export const splitLyric = (lyric) => {
  const jsonStr = JSON.stringify(lyric)
  const str = jsonStr.slice(1, jsonStr.length - 1)
  const arr = str.split('\\n').map(item => item.replace(/\\/g, ''))
  const mapList = new Map()
  arr.forEach(item => {
    if (item.match(/^\[[0-9]{2}:[0-9]{2}\.[0-9]{3}\]/)) {
      const firstNum:number = strTransformTime(item.slice(1, 10))
      const secondStr:string = item.slice(11) ? item.slice(11) : ''
      mapList.set(firstNum, secondStr)
    } else if (item.match(/^\[[0-9]{2}:[0-9]{2}\.[0-9]{2}\]/)) {
      const firstNum:number = strTransformTime(item.slice(1, 9))
      const secondStr:string = item.slice(10) ? item.slice(10) : ''
      mapList.set(firstNum, secondStr)
    } else {
      mapList.set('', '')
    }
  })
  return mapList
}

/* 时间转字符串 */
export const timeTransformStr = (time: number):string => {
  const nowTime = new Date()
  const pastTime = new Date(time)
  const nowYear = nowTime.getFullYear()
  const nowHours = nowTime.getHours()
  const nowDate = nowTime.getDate()
  const pastYear = pastTime.getFullYear()
  const pastMonth = pastTime.getMonth() + 1
  const pastDate = pastTime.getDate()
  const pastHours = pastTime.getHours()
  const pastMinutes = pastTime.getMinutes()
  // 获取时间差(/分)
  const timeDiff = (nowTime.getTime() - time) / 1000 / 60
  if (nowYear !== pastYear) {
    return `${pastYear}年${pastMonth}月${pastDate}日 ${pastHours.toString().padStart(2, '0')}:${pastMinutes.toString().padStart(2, '0')}`
  } else if (nowDate !== pastDate) {
    if (nowDate - pastDate !== 1) {
      return `${pastMonth}月${pastDate}日 ${pastHours.toString().padStart(2, '0')}:${pastMinutes.toString().padStart(2, '0')}`
    } else {
      return `昨天 ${pastHours.toString().padStart(2, '0')}:${pastMinutes.toString().padStart(2, '0')}`
    }
  } else {
    if (nowHours !== pastHours) {
      return `${pastHours.toString().padStart(2, '0')}:${pastMinutes.toString().padStart(2, '0')}`
    } else {
      if (timeDiff < 1) {
        return '刚刚'
      } else {
        return `${Math.floor(timeDiff)}分钟前`
      }
    }
  }
}
