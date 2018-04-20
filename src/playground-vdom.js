const { createElement } = require('./dom')
const { createVNode } = require('./vdom')

const translate = (vdom) => {
  return createElement(vdom.node).outerHTML
}

function render(vdom, dom) {
  dom.innerHTML = translate(vdom)
}

const user1 = { name: 'zhangsan', href: 'http://www.baidu.com', link: 'link' }

const App = (user) => {
  return <div id="wrapper" onClick={() => {
    alert('click this')
  }}>
    <span>姓名:{user.name}</span>
    <div>介绍:<a href={user.href} target="_blank">{user.link}</a></div>
  </div>
}

render(App(user1), document.getElementById('root'))
