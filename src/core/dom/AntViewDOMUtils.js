let globalMountPointCounter = 0

const getRootID = (container) => {
  return container.firstChild && container.firstChild.id;
}

const createRootId = () => {
  return `root[${globalMountPointCounter++}]`
}

const registerContainer = function (container) {
  var rootID = getRootID(container);
  if (!rootID) {
    rootID = createRootId()
  }
  return rootID;
}

const compareComponent = (preComponent, nextComponent) => {
  return preComponent.constructor === nextComponent.constructor
}

const compareNativeComponent = (preComponent, nextComponent) => {
  return preComponent.type === nextComponent.type
}

export {
  registerContainer,
  compareComponent,
  compareNativeComponent,
}