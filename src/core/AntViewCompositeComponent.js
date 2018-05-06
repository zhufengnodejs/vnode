import AntViewComponent from './AntViewComponent'
import { each } from '../util/common'

class AntViewCompositeComponent extends AntViewComponent {
  constructor(props, children) {
    super(props, children)
  }


  mountComponent(rootID) {
    this.component = this.render()
    return this.component ? this.component.mountComponent(rootID) : null
  }

  updateComponent(props) {

  }
}


export default AntViewCompositeComponent