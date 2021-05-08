import React from 'react'
import ReactDom from 'react-dom'
import s from './styles/confirmationWindow.module.css'

class confirmationWindow extends React.Component {
  constructor(props){
    super(props)
    this.el = document.createElement('div');
    this.modalRoot = document.getElementById('modal')
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
  }

  render = () => {
    const visible = this.props.confirmationWindow
    const layout = (
      <div className={visible ? [s.wrapper, s.active].join(' ') : s.wrapper}>
        <div id={s.confirmationWindow} className={visible ? s.active : ''}>
          <h1>Really???</h1>
          <div className={s.buttonSection}>
            <button value='yes' onClick={this.props.confirmationHandle}>Yes</button>
            <button value='no' onClick={this.props.confirmationHandle}>No</button>
          </div>
        </div>
      </div>
      )
    return ( ReactDom.createPortal(layout, this.el) )
  }
}

export default confirmationWindow
