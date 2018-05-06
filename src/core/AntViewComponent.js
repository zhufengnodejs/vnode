import { TYPES, DOMS } from '../util/constant'
import AntViewDiff from './AntViewDiff'

class AntViewComponent extends AntViewDiff{
  constructor(props, children) {
    super(props, children)
    const finalProps = props || {}
    this.key = finalProps.key
    this.props = finalProps
    this.props.children = this.analyzeChildren(children || [])
  }

  getDOMNode() {
    return document.getElementById(this._rootID)
  }

  wrapperText(innerHTML) {
    const Construct = this.constructor
    return new Construct(DOMS.SPAN, { innerHTML })
  }

  wrapperUndefined(innerHTML) {
    const Construct = this.constructor
    return new Construct(TYPES.UNDEFINED, {})
  }

  analyzeChildren(children) {
    return children.map(child => {
      if (typeof child === TYPES.STRING || typeof child === TYPES.NUMBER ) {
        return this.wrapperText(child)
      } else if (typeof child === undefined) {
        return this.wrapperUndefined(child)
      }
      return child
    })
  }
}

export default AntViewComponent
