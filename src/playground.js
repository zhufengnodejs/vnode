const { createElement, updateElement } = require('./util/dom')
const { createVNode } = require('./vdom')

class Render {
  constructor(vnode, dom) {
    this.dom = dom
    this.vnode = vnode
  }

  render(data) {
    const vdom = this.vnode(data)
    if (!this.vdom) {
      this.draw(vdom)
    } else {
      this.diff(this.vdom, vdom)
    }
    this.vdom = vdom
  }

  draw(vdom) {
    const element = vdom.mountComponent()
    this.dom.innerHTML = element.outerHTML
  }

  diff(currentVDom, nextVDom) {
    const curNode = currentVDom.node
    const nextNode = nextVDom.node
    if (curNode.type !== nextNode.type) {
      this.draw(nextVDom)
    } else {
      nextVDom.replaceProps(nextNode.attributes)
    }
  }
}

const user1 = { name: 'zhangsan', href: 'http://www.baidu.com', link: 'link1', hello: 'hello world 1' }
const user2 = { name: 'lisi', href: 'http://www.taobao.com', link: 'link2', hello: 'hello world 2' }
const user3 = { name: 'lisi', href: 'http://www.taobao.com', link: 'link2', hello: 'hello world 2', flag: 'true' }

const App = ({ user }) => {
  return (user.flag !== 'true' ? <div id="wrapper"
    onClick={(context) => {
      context.replaceAttributes({
        style: { color: 'blue' }
      })
    }}>
    <div><span>姓名：{user.name}</span></div>
    <div style={{ margin: "20px 0", color: 'red' }}>介绍：<a href={user.href} target="_blank">{user.link}</a></div>
    {user.hello}
  </div> : <span>{user.flag}</span>)
}

const app = new Render(App, document.getElementById('root'))

app.render({
  user: user1,
})

// 第二次调用，局部更新
setTimeout(() => {
  app.render({
    user: user2,
  })
}, 2000)

// 第三次调用，全部更新
setTimeout(() => {
  app.render({
    user: user3,
  })
}, 4000)