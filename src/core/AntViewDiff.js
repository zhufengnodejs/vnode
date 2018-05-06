class AntViewDiff {
  diffChildren(currentChildren, nextChildren, parentComponent) {
    const rootID = parentComponent._rootID
    const parentNode = parentComponent.getDOMNode()

    // 遍历当前子节点，如果当前子节点存在，下个不存在，则卸载
    currentChildren.forEach((currentChild, index) => {
      let nextChild = nextChildren[index]
      if (Array.isArray(currentChild)) {
        this.diffChildren(currentChild, nextChild, parentComponent)
        return
      }
      const key = currentChild.key
      nextChild = this._getRealChild(key, index, nextChildren)

      if (!nextChild && currentChild) {
        currentChild.unmountComponent()
      }
    })

    // 遍历下个子节点，如果下个子节点存在，当前不存在，则新增
    // 如果都存在，则判断下个节点的index是否在当前节点之前，如果是，则更新，如果不是，卸载当前节点后再插入下个节点
    nextChildren.forEach((nextChild, index) => {
      if (Array.isArray(nextChild)) {
        return
      }
      let currentIndex = index, nextIndex = index
      const key = nextChild.key
      const mashupRootID = `${rootID}.${key || index}`
      const currentChild = this._getRealChild(key, index, currentChildren, index => currentIndex = index )

      // 如果找到旧的节点
      if (currentChild) {
        if (nextIndex <= currentIndex) {
          currentChild.updateComponent(nextChild)
        } else {
          const nextNode = nextChild.mountComponent(mashupRootID)
          currentChild.unmountComponent()
          this._insertElement(parentNode, nextNode, index)
        }
      } else if (nextChild) {
        // 如果只有新节点，则插入
        const nextNode = nextChild.mountComponent(mashupRootID)
        this._insertElement(parentNode, nextNode, index)
      }
    })
  }

  _insertElement(parentNode, nextNode, index) {
    const currentNode = parentNode.childNodes[index]
    const nextSiblingNode = currentNode && currentNode.nextSibling
    if (nextSiblingNode) {
      parentNode.insertBefore(nextNode, nextSiblingNode)
    } else {
      parentNode.appendChild(nextNode)
    }
  }

  _getRealChild(key, index, children, callback) {
    let realChild = children[index]
    if (key) {
      realChild = children.filter((child, index) => {
        const result = child.key === key
        if (result && typeof callback === 'function') {
          callback(index)
        }
        return result
      })[0]
    } else {
      realChild = realChild.key ? undefined : realChild
    }
    return realChild
  }
}

export default AntViewDiff
