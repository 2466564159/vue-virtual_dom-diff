import h from './mysnabbdom/h'
import patch from './mysnabbdom/patch'

// 复杂的情况
const oldVnode = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'E' }, 'E'),
])

const newVnode = h('ul', {}, [
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'M' }, 'M'),
  h('li', { key: 'N' }, 'N'),
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'Q' }, 'Q'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'E' }, 'E'),
])

// 复杂的情况
// const oldVnode = h('ul', {}, [
//   h('li', { key: 'a' }, 'a'),
//   h('li', { key: 'b' }, 'b'),
//   h('li', { key: 'c' }, 'c'),
//   h('li', { key: 'd' }, 'd'),
//   h('li', { key: 'e' }, 'e'),
// ])

// const newVnode = h('ul', {}, [
//   h('li', { key: 'e' }, 'e'),
//   h('li', { key: 'd' }, 'd'),
//   h('li', { key: 'c' }, 'c'),
//   h('li', { key: 'b' }, 'b'),
//   h('li', { key: 'a' }, 'a'),
// ])

// 复杂的情况
// const oldVnode = h('ul', {}, [
//   h('li', { key: 'a' }, 'a'),
//   h('li', { key: 'b' }, 'b'),
//   h('li', { key: 'c' }, 'c'),
//   h('li', { key: 'd' }, 'd'),
//   h('li', { key: 'e' }, 'e'),
// ])

// const newVnode = h('ul', {}, [
//   h('li', { key: 'e' }, 'e'),
//   h('li', { key: 'c' }, 'c'),
//   h('li', { key: 'm' }, 'm'),
// ])

// 删除的情况
// const oldVnode = h('ul', {}, [
//   h('li', { key: 'a' }, 'a'),
//   h('li', { key: 'b' }, 'b'),
//   h('li', { key: 'c' }, 'c'),
//   h('li', { key: 'd' }, 'd'),
//   h('li', { key: 'e' }, 'e'),
// ])

// const newVnode = h('ul', {}, [
//   h('li', { key: 'a' }, 'a'),
//   h('li', { key: 'b' }, 'b'),
//   h('li', { key: 'd' }, 'd'),
// ])

// 删除的情况
// const oldVnode = h('ul', {}, [
//   h('li', { key: 'a' }, 'a'),
//   h('li', { key: 'b' }, 'b'),
//   h('li', { key: 'c' }, 'c'),
//   h('li', { key: 'd' }, 'd'),
// ])

// const newVnode = h('ul', {}, [
//   h('li', { key: 'a' }, 'a'),
//   h('li', { key: 'b' }, 'b'),
//   h('li', { key: 'd' }, 'd'),
// ])

// 添加的情况
// const oldVnode = h('ul', {}, [
//   h('li', { key: 'a' }, 'a'),
//   h('li', { key: 'b' }, 'b'),
//   h('li', { key: 'c' }, 'c'),
// ])

// const newVnode = h('ul', {}, [
//   h('li', { key: 'e' }, 'e'),
//   h('li', { key: 'a' }, 'a'),
//   h('li', { key: 'b' }, 'b'),
//   h('li', { key: 'c' }, 'c'),
//   h('li', { key: 'd' }, 'd'),
// ])

// 添加的情况
// const oldVnode = h('ul', {}, [
//   h('li', { key: 'a' }, 'a'),
//   h('li', { key: 'b' }, 'b'),
//   h('li', { key: 'c' }, 'c'),
// ])

// const newVnode = h('ul', {}, [
//   h('li', { key: 'a' }, 'a'),
//   h('li', { key: 'b' }, 'b'),
//   h('li', { key: 'c' }, 'c'),
//   h('li', { key: 'd' }, 'd'),
//   h('li', { key: 'e' }, 'e'),
// ])

// 得到盒子和按钮
const container = document.getElementById('container')
const btn = document.getElementById('btn')

// 第一次上树
patch(container, oldVnode)

btn.onclick = () => {
  patch(oldVnode, newVnode)
}
