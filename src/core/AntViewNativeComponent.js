import { createElement } from '../util/dom'
import AntViewComponent from './AntViewComponent'
import { each, omit } from '../util/common'
import { TYPES } from '../util/constant'

class AntViewNativeComponent extends AntViewComponent {
  constructor(type, props, children) {
    super(props, children)
    this.type = type
  }

  _mountComponentIntoDOM(id) {
    const { children } = this.props
    const attributes = {
      ...omit(this.props, ['children']),
      id,
    }
    const invoke = (fn, ...args) => fn(...args)
    return createElement({
      type: this.type,
      attributes,
      children,
    }, false, invoke)
  }

  recChild(children, element) {
    if (children && children.length) {
      children.forEach((child, index) => {
        if (typeof child === TYPES.STRING || typeof child === TYPES.NUMBER) {
          element.innerHTML += child
        } else if (Array.isArray(child)) { 
          this.recChild(child, element)
        } else {
          const key = `${child.key || index}`
          const component = child.mountComponent(key)
          component && element.appendChild(component)
        }
      })
    }
  }

  mountComponent = (rootID) => {
    const { props, type } = this
    const { children } = props
    const element = this._mountComponentIntoDOM(rootID)
    this.recChild(children, element)
    return element
  }
}

export default AntViewNativeComponent
