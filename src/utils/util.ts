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
