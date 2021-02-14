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
