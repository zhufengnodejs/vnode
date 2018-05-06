const instanceID = {};

let globalMountPointCounter = 0

const registerContainer = function () {
  return `root[${globalMountPointCounter++}]`
}

const render = (virtualComponent, container) => {
  const rootID = registerContainer(container);
  const element = virtualComponent.mountComponent(rootID)
  instanceID[rootID] = element 
  container.innerHTML = element.innerHTML
}

export default {
  render,
}