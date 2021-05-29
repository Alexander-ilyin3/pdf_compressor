import React from 'react'
import s from './styles/templateList.module.scss'

export default class TemplateList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      draggedTemplate: null,
      highlightedCard: null
    }
  }

  onDragStart = (e, templateObj) => {
    console.log('start', templateObj)
    this.setState({draggedTemplate: templateObj})
  }

  onDragLeave = (e) => {

  }

  onDragEnd = (e) => {
    // e.target.style.background = '#443a3a'
    this.props.highlightCard(null)
  }

  onDragOver = (e) => {
    e.preventDefault()
    const card = findTemplateCard(e.target)
    if ( !card ) return
    // console.log('ON CARD', card)
    this.props.highlightCard(card)
    // this.setState({highlightedCard: card})
    // console.log(this.state.highlightedCard)
    function findTemplateCard(el) {
      // console.log('ELLLLLLLLLL', el)
      let cardFound = el?.attributes['data-role']?.value && el?.attributes['data-role']?.value === 'templateCard'
      if ( !cardFound ) {
        return findTemplateCard(el.parentNode)
      }
      return el
    }
  }

  onDrop = (e, templateObj) => {
    e.preventDefault()
    this.props.changeCardsOrder(this.state.draggedTemplate, templateObj)

    this.props.highlightCard(null)

  }

  // componentDidUpdate = () => {
  //   const card = this.state.highlightedCard
  //   if ( !card ) return
  //   this.props.highlightCard(card)
  //   // card.className = s.highlighted

  // }
  sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }


  list() {
    const listArray = this.props.templates.sort(this.sortCards).map((templateObj) => {
      const { divText, headerTemplate, insertMarkIndex, id, hotkey } = templateObj
      const useActive = this.props.useAnimation.active && this.props.useAnimation.liId == id
      // console.log('props - ', this.props.useAnimation.active, this.props.useAnimation.liId, id)

      return (
        <li indexmarker={insertMarkIndex}
            listid={id}
            draggable="true"
            onDragStart={ e => this.onDragStart(e, templateObj) }
            onDragLeave={ e => this.onDragLeave(e) }
            onDragEnd={ e => this.onDragEnd(e) }
            onDragOver={ e => this.onDragOver(e) }
            onDrop={ e => this.onDrop( e, templateObj ) }
            data-role="templateCard"
            className={templateObj.highlighted ? s.highlighted : ''}
        >
          <div className={s.textWrapper}>
            <h2>{headerTemplate}</h2>
            { hotkey ? <div className={s.hotkeyContainer}>{hotkey}</div> : null }
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
