import { ref, VNode, watch, h, createVNode, render } from 'vue'

function createLoadingVNode (visible: boolean) {
  const isShow = ref<boolean>(visible)
  let vm: VNode | null = null
  function destroy () {
    if (vm.el && vm.el.parentNode) {
      vm.el.parentNode.removeChild(vm.el)
    }
  }
  function createElement () {
    if (vm.el && !vm.el.parentNode) {
      document.body.appendChild(<Node> vm.el)
    }
  }
  const loadingComponent = {
    name: 'loading',
    setup () {
      watch(() => isShow.value, (value) => {
        if (!value) {
          destroy()
        } else {
          createElement()
        }
      }, {
        immediate: true
      })
      return {
        isShow
      }
    },
    render () {
      return h('div', {
        style: {
          // @ts-ignore
          display: this.isShow ? 'block' : 'none'
        },
        class: 'loading'
      }, [
        h('div'),
        h('div')
      ])
    }
  }
  // 编译模板成虚拟dom
  vm = createVNode(loadingComponent)
  render(vm, document.createElement('div'))
  return {
    isShow,
    get $el () {
      return vm?.el as HTMLElement
    }
  }
}

function initDom (visible) {
  const instance = createLoadingVNode(visible)
  while (document.getElementsByClassName('loading')[0]) {
    document.removeChild(document.getElementsByClassName('loading')[0])
  }
  document.body.appendChild(<Node> instance.$el)
  return instance
}

export default initDom
