import h from './mysnabbdom/h'

const myVnode1 = h('div', {}, [
  h('p', {}, 'aaa'),
  h('p', {}, 'bbb'),
  h('p', {}, 'ccc'),
  h('p', {}, h('span', {}, 'A'))
])

const myVnode2 = h('ul', {}, [
  h('li', {}, '苹果'),
  h('li', {}, '西瓜'),
  h('li', {}, [
    h('div', {}, [
      h('p', {}, 'aaa'),
      h('p', {}, 'bbb')
    ])
  ]),
  h('li', {}, h('span', {}, '火龙果'))
])

console.log(myVnode2)