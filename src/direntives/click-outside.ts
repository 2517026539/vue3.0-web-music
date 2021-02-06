import { DirectiveBinding } from 'vue'
import { on } from '@/utils/dom'

type CallBack = (e: MouseEvent) => void
type ExcludeList = Map<HTMLElement, {callback: CallBack}>

const nodelist: ExcludeList = new Map()

on(document, 'click', (e: MouseEvent) => {
  for (const { callback } of nodelist.values()) {
    callback(e)
  }
})

function createCallbackFn (el: any, binding: DirectiveBinding) {
  return function (e: MouseEvent) {
    const clickTarget = e.target as Node
    let execludeDom: Node
    // 待解决jsx里面绑定arg报错的原因
    if (binding.arg) {
      execludeDom = document.getElementById(binding.arg)
    } else {
      execludeDom = document.getElementById(binding.value.arg)
    }
    // 如果点击的元素是绑定的元素及其子元素的话则不会触发回调
    if (el.contains(clickTarget) || execludeDom.contains(clickTarget)) {
      return
    }
    binding.arg ? binding.value() : binding.value.value()
  }
}

const clickOutside = {
  beforeMount (el, binding) {
    // console.log('beforMount')
    nodelist.set(el, {
      callback: createCallbackFn(el, binding)
    })
  },
  beforeUpdate (el, binding) {
    // console.log('beforeUpdate')
    nodelist.set(el, {
      callback: createCallbackFn(el, binding)
    })
  },
  unmounted (el) {
    // console.log('unmounted')
    nodelist.delete(el)
  }
}

export default clickOutside
