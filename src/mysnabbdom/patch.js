import vnode from './vnode'
import createElement from './createElement'

export default function (oldVnode, newVnode) {

  // 判断传入的第一个参数，是DOM节点还是虚拟节点？
  if (oldVnode.sel == '' || oldVnode.sel == undefined) {
    // 传入的第一个参数是DOM节点，此时要包装成虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }

  // 判断oldVnode和newVnode是不是同一个节点
  if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {

    console.log('是同一个节点')

    // 判断新旧vnode是否是同一个对象
    if (oldVnode === newVnode) return

    // 判断newVnode有没有text属性
    if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {

      console.log('newVnode有text属性')
      if (newVnode.text != oldVnode.text) {
        // 如果oldVnode中是children，那么也会立即消失掉
        oldVnode.elm.innerText = newVnode.text
      }

    } else {

      console.log('newVnode没有text属性，有children属性')
      
      // 判断oldVnode有没有children
      if (oldVnode.children != undefined && oldVnode.children > 0) {
        // oldVnode和newVnode都有children 最复杂的情况
      } else {
        // oldVnode有text，newVnode有children

        // 清空oldVnode的内容
        oldVnode.elm.innerText = ''
        // 遍历newVnode的子节点，创建DOM，上树
        for (const ch of newVnode.children) {
          oldVnode.elm.appendChild(createElement(ch))
        }
        
      }

    }


  } else {

    console.log('不是同一个节点')
    let newVnodeElm = createElement(newVnode)
    // 插入到老节点之前
    if (oldVnode.elm.parentNode && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
      //删除老节点
      oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }

  }
}