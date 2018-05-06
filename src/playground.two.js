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
    const { user, list = []} = this.props
    return <div>
      <ExampleChildren user={user} />
      <ExampleEmpty />
      {
        list.map(item => <div>{item}</div>)
      }
      <div onClick={this.onClick}>test</div>
    </div>
  }
})

AntViewDOM.render(<Example user={user1} list={[1,2,3]} />, document.getElementById('root'))
// AntViewDOM.render(<Example user={user2} />, document.getElementById('root'))