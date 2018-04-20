const { createElement, updateElement } = require('./dom')
const { createVNode } = require('./vdom')

const translate = (vdom) => {
  const { node } = vdom
  const { children } = node
  const invoke = (fn, ...args) => fn(vdom, ...args)
  const element = createElement(node, false, invoke)
  if (children && children.length) {
    children.forEach(child => {
      if (typeof child === 'string') {
        element.innerHTML += child
      } else {
        element.appendChild(translate(child) )
      }
    })
  }
  return element
}

function render(vdom, dom) {
  const element = translate(vdom)
  dom.innerHTML = element.outerHTML
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

const app = App({
  user: user1,
})

render(app, document.getElementById('root'))