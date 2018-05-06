import AntView, { AntViewDOM, createElement } from './core/AntView'


const user1 = { name: 'zhangsan', href: 'http://www.baidu.com', link: 'link1', hello: 'hello world 1' }
const user2 = { name: 'lisi', href: 'http://www.taobao.com', link: 'link2', hello: 'hello world 2' }
const user3 = { name: 'lisi', href: 'http://www.taobao.com', link: 'link2', hello: 'hello world 2', flag: 'true' }

const ExampleChildren = AntView.createClass({
  render() {
    const { user } = this.props
    return user.flag !== 'true' ? <div id="wrapper">
      <div><span>姓名：{user.name}</span></div>
      <div style={{ margin: "20px 0", color: 'red' }}>介绍：<a href={user.href} target="_blank">{user.link}</a></div>
      {user.hello}
    </div> : <span>{user.flag}</span>
  }
})

const ExampleEmpty = AntView.createClass({
  render() {
    return null
  }
})

const Example = AntView.createClass({
  onClick(e) {
    // alert(1)
  },
  render() {
    const { user, list = [] } = this.props
    return list.length === 3 ? <div style={{ color: 'red' }}>
      <ExampleChildren user={user}/>
      {
        list.map(item => <div key={item} className="animated slideInRight">{item}</div>)
      }
      <div key="a" className="animated slideInRight">a</div>
      <div key="b" className="animated slideInRight">b</div>
      <div key="c" className="animated slideInRight">c</div>
      <div key="d" className="animated slideInRight">d</div>
      <div key="x" className="animated slideInRight">x</div>
    </div> : <div>
        <ExampleChildren user={user}/>
        {
          list.map(item => <div key={item}>{item}</div>)
        }
        <div key="a" className="animated slideInRight">a</div>
        <div key="z" className="animated slideInRight">z</div>
        <div key="d" className="animated slideInRight">d</div>
        <div key="c" className="animated slideInRight">c</div>
      </div>
  }
})

AntViewDOM.render(<Example user={user1} list={[1, 2, 3]} />, document.getElementById('root'))
setTimeout(() => {
  AntViewDOM.render(<Example user={user2} list={[3, 1]} />, document.getElementById('root'))
}, 1000)