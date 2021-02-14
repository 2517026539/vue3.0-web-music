import { h, createVNode, render, watch, reactive, toRefs } from 'vue'

function createLoadingVNode (visible) {
  const isShow = reactive({
    visible
  })
  function destroy () {
    if (vm.el && vm.el.parentNode) {
      vm.el.parentNode.removeChild(vm.el)
    }
  }
  const loadingComponent = {
    setup () {
      watch(() => isShow.visible, (value) => {
        if (!value) {
          // destroy()
        }
      })
      return {
        ...toRefs(isShow)
      }
    },
    render () {
      return h('div', {
        class: 'loading',
        style: {
          // @ts-ignore
          // 警告：当数据发生变化时，只有样式发生了变化后，watch才能监听到数据的变化
          display: this.visible ? 'block' : 'none'
        }
      }, [h('div'), h('div')])
    }
  }
  // 编译模板变成虚拟dom
  const vm = createVNode(loadingComponent)
  render(vm, document.createElement('div'))
  return {
    ...toRefs(isShow),
    get $el () {
      return vm.el
    }
  }
}

export default function (visible) {
  const instance = createLoadingVNode(visible)
  while (document.getElementsByClassName('loading')[0]) {
    document.body.removeChild(document.getElementsByClassName('loading')[0])
  }
  document.body.appendChild(<Node> instance.$el)
  return instance
}
