import h from './mysnabbdom/h'
import patch from './mysnabbdom/patch'

const Vnode1 = h('section', {}, '我是老Dom')

// 得到盒子和按钮
const container = document.getElementById('container')
const btn = document.getElementById('btn')

// 第一次上树
patch(container, Vnode1)

// 新的节点
const Vnode2 = h('section', {}, [
  h('p', {}, 'a'),
  h('p', {}, 'b'),
  h('p', {}, 'c'),
  h('p', {}, 'd'),
])

btn.onclick = () => {
  patch(Vnode1, Vnode2)
}
