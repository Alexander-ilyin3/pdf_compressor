import React from 'react'
import s from './styles/confirmationWindow.module.css'

function confirmationWindow(props) {
  const visible = props.confirmationWindow
    console.log('{props.confirmationWindow}', props.confirmationWindow)
  // }

  return(<>
  <div className={visible ? [s.wrapper, s.active].join(' ') : s.wrapper}>
    <div id={s.confirmationWindow} className={visible ? s.active : ''}>
      <h1>Really?</h1>
      <div className={s.buttonSection}>
        <button value='yes' onClick={props.confirmationHandle}>Yes</button>
        <button value='no' onClick={props.confirmationHandle}>No</button>
      </div>
    </div>
  </div>

  </>)
}

export default confirmationWindow
