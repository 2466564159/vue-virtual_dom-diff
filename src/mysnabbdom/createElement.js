// 真正创建节点，将vnode创建为DOM，是孤儿节点，不进行插入
export default function createElement (vnode) {
  // 创建一个DOM节点，这个节点现在还是孤儿节点
  let domNode = document.createElement(vnode.sel)
  // 有字节还是有文本
  if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
    // 当内部是文字
    domNode.innerText = vnode.text
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 当内部是子节点 递归创建节点
    for (let ch of vnode.children) {
      domNode.append(createElement(ch))
    }
  }

  // 补充elm属性
  vnode.elm = domNode
  return domNode
}