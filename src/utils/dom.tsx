export const on = function (element: HTMLElement | Document | Window, event: string, handle, useCapture = false): void {
  if (element && event && handle) {
    // useCapture 为 false, 事件方法在冒泡阶段执行，默认为true
    return element.addEventListener(event, handle, useCapture)
  }
}

export const off = function (element: HTMLElement | Document | Window, event: string, handle) {
  if (element && event && handle) {
    return element.addEventListener(event, handle)
  }
}
