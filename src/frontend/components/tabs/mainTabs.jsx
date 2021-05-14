import React from 'react'
import { Link } from 'react-router-dom'
import s from './tabs.module.scss'

class Tabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeHash: '#/Home' //window?.location?.hash === '#/home' ? '#/Home' : window?.location?.hash || '#/Home'
    }
  }

  // componentDidMount() {
  //   document.querySelector('[href="#/Home"]').parentNode.classList = s.active
  // }

  handleClick = () => {
    let path = window.location.hash.match(/(.*)/, 'g')[1]
    this.setState({activeHash: path})
  }

  render() {
    console.log(window?.location?.hash)
    return(
      <nav>
        <ul onClick={this.handleClick} className={s.tabs}>
          <li className={this.state.activeHash === '#/Home' ? s.active : ''}>
            <Link to="/Home" className={s.tabLink}>Pic compressor</Link>
          </li>
          <li className={this.state.activeHash === '#/commonDell' ? s.active : ''}>
            <Link to="/commonDell" className={s.tabLink}>Dell common</Link>
          </li>
          <li className={this.state.activeHash === '#/templates' ? s.active : ''}>
            <Link to="/templates" className={s.tabLink}>Templates</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Tabs
