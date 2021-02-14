import initDom from './createLoadingElement'

const loading = {
  mounted (el, binding) {
    const instance = initDom(binding.value)
    el.instance = instance
  },
  updated (el, binding) {
    const { instance } = el
    if (!el.instance) {
      return
    }
    if (binding.oldValue !== binding.value) {
      if (instance.isShow.value && !binding.value) {
        instance.isShow.value = false
      } else {
        instance.isShow.value = true
      }
    }
  }
}

export default loading
