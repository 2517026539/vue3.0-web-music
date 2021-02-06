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
