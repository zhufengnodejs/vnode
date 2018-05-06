import AntViewComponent from './AntViewComponent'
import { each } from '../util/common'

class AntViewCompositeComponent extends AntViewComponent {
  constructor(props, children) {
    super(props, children)
  }

  mountComponent(rootID) {
    this.currentComponent = this.render()
    return this.currentComponent ? this.currentComponent.mountComponent(rootID) : null
  }

  updateComponent(nextComponent) {
    this.nextComponent = nextComponent.render()
    this.currentComponent.updateComponent(this.nextComponent)
  }
}

export default AntViewCompositeComponent