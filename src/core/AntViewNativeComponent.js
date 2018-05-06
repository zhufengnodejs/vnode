import { createElement, updateElement } from '../util/dom'
import { compareNativeComponent } from './dom/AntViewDOMUtils'
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

  mountChildren(children, element, rootID) {
    if (children && children.length) {
      children.forEach((child, index) => {
        const specKey = child.key
        const mashupRootID = `${rootID}.${specKey || index}`
        if (typeof child === TYPES.STRING || typeof child === TYPES.NUMBER) {
          element.innerHTML += child
        } else if (Array.isArray(child)) {
          this.mountChildren(child, element, mashupRootID)
        } else {
          const component = child.mountComponent(mashupRootID)
          component && element.appendChild(component)
        }
      })
    }
  }

  mountComponent(rootID) {
    this._rootID = rootID
    const { props, type } = this
    const { children } = props
    const element = this._mountComponentIntoDOM(rootID)
    this.mountChildren(children, element, rootID)
    return element
  }

  unmountComponent() {
    const currentNode = this.getDOMNode()
    currentNode.outerHTML = ''
  }

  updateComponent(nextComponent) {
    const currentComponent = this
    const currentNode = this.getDOMNode()
    if (compareNativeComponent(currentComponent, nextComponent)) {
      this.replaceAttributes(nextComponent.props, currentNode)
      this.diffChildren(currentComponent.props.children, nextComponent.props.children, currentComponent)
    } else if (currentComponent && nextComponent) {
      currentNode.outerHTML = nextComponent.mountComponent(this._rootID).outerHTML
    }
  }

  replaceAttributes(props, node) {
    const attributes = {
      ...omit(props, ['children']),
      id: this._rootID,
    }
    updateElement({
      type: this.type,
      attributes,
    }, node)
  }
}

export default AntViewNativeComponent
