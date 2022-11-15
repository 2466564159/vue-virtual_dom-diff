import createElement from "./createElement"
import patchVnode from "./patchVnode"

// 判断是不是同一个节点
function checkSameVnode(a, b) {
  return a.sel == b.sel && a.key == b.key
}

/*
  1.生成4个下标，和4个与之对应的节点，用来控制oldCh和newCh
  2.while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx)
    1）旧前和新前
    2）旧后和新后
    3）旧前和新后
    4）旧后和新前
    5）四种都没有命中
  3.循环结束，添加或者删除节点
*/
export default function updateChildren(parentElm, oldCh, newCh) {
  // 旧前 旧后 下标
  let oldStartIdx = 0, 
      oldEndIdx = oldCh.length - 1
  // 旧前 旧后 节点
  let oldStartVnode = oldCh[oldStartIdx],
      oldEndVnode = oldCh[oldEndIdx]
  
  // 新前 新后 下标
  let newStartIdx = 0,
      newEndIdx = newCh.length - 1
  // 新前 新后 节点
  let newStartVnode = newCh[newStartIdx],
      newEndVnode = newCh[newEndIdx]

  let keyMap = null

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {

    // 略过已经加undefined标记的东西
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx]
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx]
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) {

      // 1旧前和新前
      console.log('1旧前和新前')
      // 递归 精细化比较两个节点 
      patchVnode(oldStartVnode, newStartVnode)
      // 移动指针，改变指针指向的节点
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]

    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {

      // 2旧后和新后
      console.log('2旧后和新后')
      // 递归 精细化比较两个节点 
      patchVnode(oldEndVnode, newEndVnode)
      // 移动指针，改变指针指向的节点
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]

    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {

      // 3旧前和新后
      console.log('3旧前和新后')
      // 递归 精细化比较两个节点 
      patchVnode(oldStartVnode, newEndVnode)
      // 当旧前和新后命中时，把旧前指向的节点移动到旧后的后面
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      // 移动指针，改变指针指向的节点
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]

    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {

      // 4旧后和新前
      console.log('4旧后和新前')
      // 递归 精细化比较两个节点 
      patchVnode(oldEndVnode, newStartVnode)
      // 当旧前和新后命中时，把旧后指向的节点移动到旧前的前面
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      // 移动指针，改变指针指向的节点
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]

    } else {
      // 四种都没有命中
      console.log('四种都没有命中')
      if (!keyMap) {
        keyMap = {}
        // 记录oldCh中的节点出现的key
        // 从oldStartIdx开始到oldEndIdx结束，创建keyMap
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key
          if (key !== undefined) {
            keyMap[key] = i
          }
        }
      }

      // 寻找当前项（newStartIdx）在keyMap中映射的序号
      const idxInOld = keyMap[newStartVnode.key]
      if (idxInOld === undefined) {
        // 是全新的项，要插入
        // 被加入的项（就是newStartVnode这项)现不是真正的DOM节点
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
      } else {
        // 不是全新的项，要移动
        const elmToMove = oldCh[idxInOld]
        patchVnode(elmToMove, newStartVnode)
        // 移动，调用insertBefore也可以实现移动。
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
        // 把这项设置为undefined，表示我已经处理完这项了
        oldCh[idxInOld] = undefined
      }

      newStartVnode = newCh[++newStartIdx]
    }
  }

  // 循环结束
  if (newStartIdx <= newEndIdx) {
    // newCh还有剩余节点没有处理，所以要添加这些节点

    // before为 要插入元素的后一个，如果为undefined，就寻找下一个的下一个，依次遍历
    let before = null
    for (let i = oldStartIdx; i <= oldCh.length; i++) {
      if (before) break
      before = oldCh[i] == null ? null : oldCh[i].elm
    }
    
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // insertBefore方法可以自动识别null，如果是null就会自动排到队尾，和appendChild一致
      parentElm.insertBefore(createElement(newCh[i]), before)
    }
  } else if (oldStartIdx <= oldEndIdx) {
    // oldCh还有剩余节点没有处理，所以要删除这些节点
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm)
      }
    }
  }
}