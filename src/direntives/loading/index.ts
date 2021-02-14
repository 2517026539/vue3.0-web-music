import createLoading from './createLoadingElement'

const loading = {
  mounted (el, binding) {
    const instance = createLoading(binding.value)
    el.instance = instance
  },
  updated: (el, binding) => {
    if (binding.oldValue !== binding.value) {
      if (el.instance.visible.value && !binding.value) {
        el.instance.visible.value = false
      } else {
        el.instance.visible.value = true
      }
    }
  }
}

export default loading
