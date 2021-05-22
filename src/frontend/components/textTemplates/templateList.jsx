import React from 'react'
import s from './styles/templateList.module.scss'

export default class TemplateList extends React.Component {
  constructor(props) {
    super(props)
  }

  list() {
    const listArray = this.props.templates.map((templateObj) => {
      const { divText, headerTemplate, insertMarkIndex, id } = templateObj
      const useActive = this.props.useAnimation.active && this.props.useAnimation.liId == id
      // console.log('props - ', this.props.useAnimation.active, this.props.useAnimation.liId, id)

      return (
        <li indexmarker={insertMarkIndex} listid={id}>
          <div className={s.textWrapper}>
            <h2>{headerTemplate}</h2>
            <p dangerouslySetInnerHTML={{__html: divText}}></p>
          </div>
            <button className={s.deleteButton} onClick={this.props.deleteTemplate}>X</button>
          <div className={s.useEditWrapper}>
            <button 
              className={ useActive ? [s.useAnimationActive, s.useButton].join(' ') : s.useButton} 
              onClick={this.props.useTemplate}
            >
              {useActive ? 'Copied!' : 'Use' }
            </button>
            <button className={s.editButton} onClick={this.props.editTemplate}>Edit</button>
          </div>
        </li>
      )

    })
    return listArray
  }

  render() {
    return(
      <ul className={s.templateUl}>
        {this.list()}
      </ul>
    )
  }
}
