import { TYPES, DOMS } from '../util/constant'

class AntViewComponent {
  constructor(props, children) {
    const finalProps = props || {}
    this.props = finalProps
    this.props.children = this.analyzeChildren(children || [])
  }

  wrapperText = (innerHTML) => {
    const Construct = this.constructor
    return new Construct(DOMS.SPAN, { innerHTML })
  }

  wrapperUndefined = (innerHTML) => {
    const Construct = this.constructor
    return new Construct(TYPES.UNDEFINED, {})
  }

  analyzeChildren = (children) => {
    return children.map(child => {
      if (typeof child === TYPES.STRING) {
        return this.wrapperText(child)
      } else if (typeof child === undefined) {
        return this.wrapperUndefined(child)
      }
      return child
    })
  }
}

export default AntViewComponent
