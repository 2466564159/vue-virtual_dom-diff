import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom"

// 得到盒子和按钮
const container = document.getElementById('container')
const btn = document.getElementById('btn')

//创建出patch函数
const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule
])

const vnode1 = h('ul', {}, [
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'c' }, 'c'),
  h('li', { key: 'd' }, 'd')
])

patch(container, vnode1)

const vnode2 = h('ul', {}, [
  h('li', { key: 'e' }, 'e'),
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'c' }, 'c'),
  h('li', { key: 'd' }, 'd')
])

// 点击按钮时，将vnode1变为vnode2
btn.onclick = function () {
  patch(vnode1, vnode2)
}
