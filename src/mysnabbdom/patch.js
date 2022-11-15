import vnode from './vnode'
import createElement from './createElement'
import patchVnode from "./patchVnode";

/*
  1.判断oldVnode是DOM节点还是虚拟节点，如果是就包装为虚拟节点（这一步不属于虚拟dom和diff范围，所以没写）
  2.oldVnode和newVnode是同一个节点，如果是进入patchVnode
  3.oldVnode和newVnode不是同一个节点，直接创建新DOM覆盖老DOM
*/
export default function patch (oldVnode, newVnode) {

  // 判断oldVnode是DOM节点还是虚拟节点？
  if (oldVnode.sel == '' || oldVnode.sel == undefined) {
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }

  // 判断oldVnode和newVnode是不是同一个节点
  if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
    // oldVnode和newVnode 是同一个节点

    patchVnode(oldVnode, newVnode)

  } else {
    // oldVnode和newVnode 不是同一个节点 创建新DOM覆盖老DOM

    let newVnodeElm = createElement(newVnode)
    // 插入到老节点之前
    if (oldVnode.elm.parentNode && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
      //删除老节点
      oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }

  }
}