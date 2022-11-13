import vnode from './vnode'

//编写一个低配版的h函数，这个函数必须接受3个参数，缺一不可
//相当于它的重载功能较弱
//也就是说，调用的时候形态必须是下面的三种之一：
//形态1：h('div', {}, '文字')
//形态2：h('div', {}, [])
//形态3：h('div', {}, h())
export default function(sel, data, c) {
  // 检查参数的个数
  if (arguments.length != 3)
    throw new Error('对不起，h函数必须传入3个参数，我们是低配版h函数')

  // 检查参数c的类型
  if (typeof c == 'string' || typeof c == 'number') {
    // 形态1
    return vnode(sel, data, undefined, c, undefined)
  } else if (Array.isArray(c)) {
    // 形态2
    let children = []
    // 遍历c，收集children
    for (const item of c) {
      if (!(typeof item == 'object' && item.hasOwnProperty('sel')))
        throw new Error('传入的数组参数中有项不是h函数')
      
      children.push(item)
    }
    // 循环结束，收集children完毕，返回虚拟节点，它由children属性的
    return vnode(sel, data, children, undefined, undefined)
  } else if (typeof c == 'object' && c.hasOwnProperty('sel')) {
    // 形态3
    // 传入的c是唯一的children
    let children = [c]
    return vnode(sel, data, children, undefined, undefined)
  } else {
    throw new Error('传入的第三个参数类型不对')
  }
}