import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom"

//创建出patch函数
const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule
])

//创建虚拟节点
const myVnode1 = h('a', { 
  props: { 
    href: 'http://www.atguigu.com',
    target: '_blank'
  } 
}, '尚硅谷')

const myVnode2 = h('div', '我是一个盒子')

const myVnode3 = h('ul', [
  h('li', '苹果'),
  h('li', '西瓜'),
  h('li', [
    h('div', [
      h('p', 'aaa'),
      h('p', 'bbb')
    ])
  ]),
  h('li', h('span', '火龙果'))
])
console.log(myVnode3)

//让虚拟节点上树
const container = document.getElementById('container')
patch(container, myVnode3)