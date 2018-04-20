const { updateElement } = require('./dom')
const $ = require('jquery')
const keys = Object.keys

function each(obj, fn) {
  return keys(obj).forEach((k) => {
    fn(obj[k], k)
  })
}
let count = 0

class VDom {
  constructor(type, attributes, children) {
    this._rootId = this.randomId(type)
    this.node = {
      type,
      attributes: {
        ...attributes,
        id: this._rootId,
      },
      children,
    }
  }

  randomId(type) {
    const id = ++count
    return `${type}${id}`
  }

  getDOMNode() {
    return document.getElementById(this._rootId)
  }

  replaceAttributes(attributes) {
    updateElement({
      ...this.node,
      attributes,
    }, this.getDOMNode())
  }
}

/*
* 返回虚拟dom
*/
export const createVNode = (type, props, ...children) => {
  const vDom = new VDom(type, props, children)
  return vDom
}
