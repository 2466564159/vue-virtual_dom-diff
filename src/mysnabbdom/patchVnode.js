import createElement from "./createElement"
import updateChildren from "./updateChildren"

/*
  1.判断新旧vnode是否是同一个对象
  2.当newVnode有text属性，直接覆盖
  3.当newVnode有children属性，且oldVnode也有children属性，进入updateChildren，进行精细化处理（diff核心）
  4.当newVnode有children属性，且oldVnode有text属性，直接清空oldVnode的内容，创建newVnode的DOM，上树
*/
export default function patchVnode(oldVnode, newVnode) {

  // 判断新旧vnode是否是同一个对象
  if (oldVnode === newVnode) return

  // 判断newVnode有没有text属性
  if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
    // newVnode有text属性

    // 如果newVnode.text和oldVnode.text不相同 直接覆盖
    if (newVnode.text != oldVnode.text) {
      oldVnode.elm.innerText = newVnode.text
    }

  } else {
    // newVnode有children属性

    // 判断oldVnode有没有children
    if (oldVnode.children != undefined && oldVnode.children.length > 0) {
      // oldVnode和newVnode都有children 最复杂的情况
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)

    } else {
      // newVnode有children属性，oldVnode有text属性

      // 清空oldVnode的内容
      oldVnode.elm.innerText = ''
      // 遍历newVnode的子节点，创建DOM，上树
      for (const ch of newVnode.children) {
        oldVnode.elm.appendChild(createElement(ch))
      }

    }

  }
}