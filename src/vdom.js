const $ = require('jquery')
const keys = Object.keys

function each(obj, fn) {
  return keys(obj).forEach((k) => {
    fn(obj[k], k)
  })
}

class VDom {
  constructor(type, props, children) {
    this.node = {
      type,
      props,
      children,
    }
  }
}

/*
* 返回虚拟dom
*/
export const createVNode = (type, props, ...children) => {
  const vDom = new VDom(type, props, children)
  return vDom
}
