import React from 'react'
import s from './styles/modal.module.scss'

export default class AddTemplateModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      insertMarkIndex: -1,
      markMode: false,
      divText: '<tagggg></tagggg>',
      headerTemplate: '',
      changebleDiv: null
    }
  }

  componentDidMount() {
    this.setState({changebleDiv: document.body.querySelector(`div#editable`)})
    this.setState({headerTemplate: this.props.lastCommonHeaderName})
  }

  headerTemplateChange = (e) => {
    this.setState({headerTemplate: e.target.value})
  }

  onDivContentChange = (e) => {
    if ( this.state.markMode ) return
    this.setState({divText: e.innerHTML})
  }

  toggleMarkMode = () => {
    this.setState({markMode: !this.state.markMode})
  }

  deleteChild = (e) => {
    // console.log(e.target)
    // console.log('ChangebleDiv', this.state.changebleDiv)
    this.setState({insertMarkIndex: -1})
    this.state.changebleDiv.children.forEach( child => this.state.changebleDiv.removeChild(child))  //.removeChild(e.target.children[0])
    this.state.changebleDiv.innerText = this.state.changebleDiv.innerText
  }

  placeMark = (e) => {

    if ( !this.state.markMode ) return
    const index = document.getSelection().focusOffset
    this.setState({insertMarkIndex: index})
    // if ( e.target.children[0] ) e.target.removeChild(e.target.children[0])
    const text = e.target.innerText
    const firstPart = text.slice(0, index)
    const secondPart = text.slice(index)


    e.target.innerHTML = firstPart.replaceAll('<', '&lt').replaceAll('>', '&gt')
    e.target.innerHTML += this.mark()
    e.target.innerHTML += secondPart.replaceAll('<', '&lt').replaceAll('>', '&gt')

    // const newText = this.insertToStr(processed, index, this.mark())
    // e.target.innerHTML = newText
    // console.log(newText, processed)
  }

  mark = () => {
    return (
      `<span id=${s.mark} >|</span>`
    )
  }

  insertToStr = (str, index, value) => {
    return str.slice(0, index) + value + str.slice(index);
    // return str.substr(0, index) + value + str.substr(index);
  }

  sendState = () => {
    const state = { divText: this.state.divText, insertMarkIndex: this.state.insertMarkIndex, headerTemplate: this.state.headerTemplate }
    this.props.saveTemplate(state)
  }

  render() {
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
          <input className={s.templateHeader} onChange={this.headerTemplateChange} value={this.state.headerTemplate}></input>
          <ChangebleDiv
            clas={s.editableDiv}
            onMouseDown={this.deleteChild}
            onClick={this.placeMark}
            onChange={this.onDivContentChange}>
              {this.state.divText}
          </ChangebleDiv>
          <button className={s.addTemplateBtn} onClick={this.sendState}>Add template</button>
        </div>
      </div>
    )
  }
}

class ChangebleDiv extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return(
    <div className={this.props.clas} contenteditable="true" onMouseDown={this.props.onMouseDown} onClick={this.props.onClick} onChange={this.props.onChange} id="editable">
      {this.props.children}
    </div>
    )
  }

}
