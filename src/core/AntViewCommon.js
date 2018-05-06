import { mixinToClass } from '../util/common'
import { TYPES } from '../util/constant'
import AntViewCompositeComponent from './AntViewCompositeComponent'
import AntViewNativeComponent from './AntViewNativeComponent'

const createElement = (Constructor, props, ...children) => {
  if (typeof Constructor === TYPES.STRING) {
    const type = Constructor
    return new AntViewNativeComponent(type, props, children)
  }

  return new Constructor(props, children)
}

const createClass = function(options) {
  class OriginConstructor extends AntViewCompositeComponent {
    constructor(props, children) {
      super(props, children)
    }
  }

  mixinToClass(OriginConstructor, options)

  const Constructor = function (...args) {
    return new OriginConstructor(...args)
  }

  return Constructor
}


export {
  createElement,
  createClass,
}