import animations from 'create-keyframe-animation'

function _getPosAndScale (el, targetWidth) {
  // 浏览器的可视区域宽度
  const width = window.innerWidth
  // 缩略图与与原图的比例
  const scale = targetWidth / width
  // 缩略图中心点的x坐标
  const paddingLeft = el.clientWidth * scale / 2
  // 缩略图中心点的y坐标
  const paddingBottom = el.clientHeight * scale / 2
  // 缩略图与原图的中心点x的距离
  const x = -(width / 2 - paddingLeft)
  // 缩略图与原图的中心点y的距离
  const y = el.clientHeight / 2 - paddingBottom
  return { x, y, scale }
}

export default function animationPlayer () {
  function enter (el, done = () => {}) {
    const { x, y, scale } = _getPosAndScale(el, 60)
    const animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      },
      100: {
        transform: 'translate3d(0, 0, 0) scale(1)'
      }
    }
    animations.registerAnimation({
      name: 'enter',
      animation,
      presets: {
        duration: 300,
        easing: 'linear'
      }
    })
    animations.runAnimation(el, 'enter', done)
  }

  function afterEnter () {
    setTimeout(() => {
      animations.unregisterAnimation('enter')
    }, 300)
  }

  function leave (el, done: () => void) {
    const { x, y, scale } = _getPosAndScale(el, 60)
    const animation = {
      0: {
        transform: 'translate3d(0, 0, 0) scale(1)'
      },
      100: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      }
    }
    animations.registerAnimation({
      name: 'leave',
      animation,
      presets: {
        duration: 300,
        easing: 'linear'
      }
    })
    animations.runAnimation(el, 'leave', done)
  }

  function afterLeave () {
    setTimeout(() => {
      animations.unregisterAnimation('leave')
    }, 300)
  }

  return {
    enter,
    afterEnter,
    leave,
    afterLeave
  }
}
