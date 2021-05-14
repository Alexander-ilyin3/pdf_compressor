import React from 'react'
import TemplateList from './templateList.jsx'
import AddTemplateModal from './addTemplateModal.jsx'
import s from './styles/index.module.scss'
// import { template } from '@babel/core'
// import { match } from 'assert'
// import { locals } from '../mainPage/styles/index.module.scss.js'

let lastCommonHeaderName = 'Template_1'

class Templates extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsVisible: false,
      templates: [],
      lastCommonHeaderName: ''
    }
  }

  click = (e) => {
    console.log(e.target.selectionStart)
  }

  invokeModal = () => {
    this.setState({modalIsVisible: true})
  }

  closeModal = () => {
    this.setState({modalIsVisible: false})
  }

  saveTemplate = (childState) => {
    this.setState({modalIsVisible: false})
    this.setState({templates: [...this.state.templates, childState]})
    this.setState({lastCommonHeaderName: lastCommonHeaderName})
    console.log(this.state)
  }

  componentDidMount() {
    const templates = JSON.parse(localStorage.getItem('templates'))
    if ( templates ) this.setState({templates: templates})
  }

  componentDidUpdate() {
    // console.log('DID UPDATED')
    const canculateLastName = () => {
    const templates = this.state.templates
    let maxNumber = 0
    const numbers = []
      templates.forEach(template => {
        const matchObj = template.headerTemplate.match(/^Template_(\d+)$/, 'g')
        if ( matchObj && matchObj[1] ) {
          numbers.push(parseFloat(matchObj[1]))
        }
        maxNumber = Math.max.apply(null, numbers)
      })
      return 'Template_' + (maxNumber + 1)
    }

    lastCommonHeaderName = canculateLastName()
    console.log('DID UPDATED', lastCommonHeaderName)
    localStorage.setItem('templates', JSON.stringify(this.state.templates))
  }

  render = () => {
    return (
      <div id={s.root}>
        <button id={s.addTemplate} onClick={this.invokeModal}><span>+</span></button>
        {/* <Templates /> */}

        { this.state.modalIsVisible ?
          <AddTemplateModal isActive={this.state.modalIsVisible} closeModal={this.closeModal} saveTemplate={this.saveTemplate} lastCommonHeaderName={lastCommonHeaderName}/>
          : ''
        }
      </div>
    )
  }
}

export default Templates
