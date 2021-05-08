import React from 'react'
import { Link } from 'react-router-dom'
import s from './tabs.module.css'

class Tabs extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <nav id={s.navTabs}>
        <ul>
          <li>
            <Link to="/Home" className={s.tabLink}>Pic compressor</Link>
          </li>
          <li>
            <Link to="/commonDell" className={s.tabLink}>Dell common</Link>
          </li>
        </ul>
      </nav>
    )
  }

}

export default Tabs
