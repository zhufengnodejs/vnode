import { registerContainer, compareComponent } from './AntViewDOMUtils'

const instanceID = {};

const render = function (nextComponent, container) {
  const rootID = registerContainer(container)
  const preComponent = instanceID[rootID]

  if (preComponent && compareComponent(preComponent, nextComponent)) {
    preComponent.updateComponent(nextComponent)
  } else {
    const element = nextComponent.mountComponent(rootID)
    instanceID[rootID] = nextComponent
    container.innerHTML = element.outerHTML
  }
}

export default {
  render,
}