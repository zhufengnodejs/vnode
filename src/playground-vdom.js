const { createElement, updateElement } = require('./dom')
const { createVNode } = require('./vdom')

class Render {
  constructor(vnode, dom) {
    this.dom = dom
    this.vnode = vnode
  }

  diff(currentVDom, nextVDom) {
    // TODO
    const curNode = currentVDom.node
    const nextNode = nextVDom.node

    if (curNode.type !== nextNode.type) {
      currentVDom.getElementById = _translate(vdom)
    }
  }

  render(data) {
    const vdom = this.vnode(data)
    if (!this.vdom) {
      const element = this._translate(vdom)
      this.dom.innerHTML = element.outerHTML
    } else {
      this.diff(this.vdom, vdom)
    }
    this.vdom = vdom
  }

  _translate = (vdom) => {
    const { node } = vdom
    const { children } = node
    const invoke = (fn, ...args) => fn(vdom, ...args)
    const element = createElement(node, false, invoke)
    if (children && children.length) {
      children.forEach(child => {
        if (typeof child === 'string') {
          element.innerHTML += child
        } else {
          element.appendChild(this._translate(child) )
        }
      })
    }
    return element
  }
}

const user1 = { name: 'zhangsan', href: 'http://www.baidu.com', link: 'link1' }
const user2 = { name: 'lisi', href: 'http://www.taobao.com', link: 'link2' }

const App = ({ user }) => {
  return (<div id="wrapper" 
    onClick={(context) => {
      context.replaceAttributes({
        style: { color: 'blue' }
      })
    }}>
    hello,world<br />
    <div><span style={{margin: "20px 0", display: 'inline-block', color: 'red' }}>姓名：{user.name}</span></div>
    <div>介绍：<a href={user.href} target="_blank">{user.link}</a></div>
  </div>)
}

const app = new Render(App, document.getElementById('root'))

app.render({
  user: user1,
})

// 第二次调用，局部更新
app.render({
  user: user2,
})