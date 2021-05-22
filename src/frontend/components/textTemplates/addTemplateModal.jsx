import React from 'react'
import s from './styles/modal.module.scss'

export default class AddTemplateModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      insertMarkIndex: -1,
      markMode: false,
      divText: '',
      simpleText: '',
      headerTemplate: '',
      changebleDiv: null,
      headerTouched: false,
      htmlMode: true,
      currentSelection: 0
    }
    this.onPastePlainText = this.onPastePlainText.bind(this)
  }

  componentDidMount = () => {
    this.setState({changebleDiv: document.body.querySelector(`div#editable`)})
    this.setState({headerTemplate: this.props.lastCommonHeaderName})
    this.setState({headerTouched: false})
    document.getElementById('editable').addEventListener('paste', this.onPastePlainText)

    const editObj = this.props.editInfo

    if ( editObj.active === true ) {
      const { divText, headerTemplate, id, insertMarkIndex} = editObj.templateObj
      this.setState({
        divText: divText,
        headerTemplate: headerTemplate,
        headerTouched: true
      })
    }
  }

  componentWillUnmount = () => {
    // console.log('unmounted')
    this.props.editModeOff()
  }

  onPastePlainText (e) {
    const pastedText = e.clipboardData.getData('text/plain')

    e.target.textContent = pastedText

    this.setState({divText: pastedText, htmlMode: false})
    e.preventDefault()
    return false
  }


  headerTouched = () => {
    if ( this.state.headerTouched ) return
    this.setState({headerTemplate: ''})
    this.setState({headerTouched: true})
  }

  headerTemplateChange = (e) => {
    this.setState({headerTemplate: e.target.value})
  }

  onFocus = () => {
    if ( this.state.markMode ) return
    this.setState({htmlMode: false})
  }

  onDivContentChange = (e) => {
    if ( this.state.markMode ) return

    this.setState({divText: e.target.innerText})

    if ( this.state.htmlMode ) {
      this.setState({ htmlMode: false })
    }
  }

  toggleMarkMode = () => {
    this.setState({markMode: !this.state.markMode})
  }

  deleteChild = (e) => {
    this.setState({insertMarkIndex: -1})
    this.state.changebleDiv.children.forEach( child => this.state.changebleDiv.removeChild(child))
    this.state.changebleDiv.innerText = this.state.changebleDiv.innerText
  }

  placeMark = (e) => {

    if ( !this.state.markMode ) return
    const index = document.getSelection().focusOffset
    this.setState({insertMarkIndex: index, simpleText: this.state.changebleDiv.innerText})
    const text = e.target.innerText
    const firstPart = text.slice(0, index)
    const secondPart = text.slice(index)

    let divTextString = ''

    divTextString = firstPart.replaceAll('<', '&lt').replaceAll('>', '&gt')
    divTextString += this.mark()
    divTextString += secondPart.replaceAll('<', '&lt').replaceAll('>', '&gt')

    this.setState({divText: divTextString, htmlMode: true})
  }

  mark = () => {
    return (
      `<span id=${s.mark} >|</span>`
    )
  }

  insertToStr = (str, index, value) => {
    return str.slice(0, index) + value + str.slice(index)
  }

  sendState = () => {
    if ( this.props?.editInfo?.active ) {
      // console.log('this.props.editInfo', this.props.editInfo)
      return this.props.saveTemplate('edit', { 
        divText: this.state.divText, 
        insertMarkIndex: this.state.insertMarkIndex, 
        headerTemplate: this.state.headerTemplate,
        simpleText: this.state.simpleText,
        id: this.props.editInfo.templateObj.id })
    }
    const state = {
      divText: this.state.divText, 
      insertMarkIndex: this.state.insertMarkIndex, 
      headerTemplate: this.state.headerTemplate,
      simpleText: this.state.simpleText,
      id: new Date().getTime() 
    }
    this.props.saveTemplate('create', state)
  }

  render() {
    let dText = {__html: this.state.divText}
    return(
      <div className={this.props.isActive ? [s.wrapper, s.active].join(' ') : s.wrapper}>
        <div className={s.innerWrapper}>
          <button
            className={this.state.markMode ?
               `${s.topButtons} ${s.insertMarkBtn} ${s.markActive}` :
               `${s.topButtons} ${s.insertMarkBtn}`}
            onClick={this.toggleMarkMode}>
            <span>Mark</span>
          </button>
          <button className={`${s.topButtons} ${s.closeButton}`} onClick={this.props.closeModal}><span>X</span></button>
          <input className={s.templateHeader} onChange={this.headerTemplateChange} value={ this.state.headerTemplate } onClick={this.headerTouched}></input>
          <div 
            className={s.editableDiv} 
            contenteditable="true" 
            onMouseDown={this.deleteChild} 
            onClick={this.placeMark} 
            onInput={this.onDivContentChange} 
            onFocus={this.onFocus}
            id="editable"
            dangerouslySetInnerHTML={this.state.htmlMode ? dText : undefined }>
              {/* {this.state.htmlMode ? undefined : this.state.divText} */}
          </div>
          <button className={s.addTemplateBtn} onClick={this.sendState}>{this.props.editInfo?.active ? 'Save changes' : 'Add template'}</button>
        </div>
      </div>
    )
  }
}
