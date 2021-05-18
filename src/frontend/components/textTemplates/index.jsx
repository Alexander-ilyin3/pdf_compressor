import React from 'react'
import TemplateList from './templateList.jsx'
import AddTemplateModal from './addTemplateModal.jsx'
import s from './styles/index.module.scss'

let lastCommonHeaderName = 'Template_1'

class Templates extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsVisible: false,
      templates: [],
      lastCommonHeaderName: '',
      editMode: {
        active: false,
        templateId: 0
      }
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

  saveTemplate = (option, childState) => {
    if ( option === 'edit') {
      this.setState( state => {
        const newState = state.templates.map((template) => {
          if ( template.id != childState.id ) return template
          console.log('CHANGED CHILD', childState)
          return childState
        })
        return { templates: newState}

      })
    } else if ( option === 'create' ) {
      this.setState({templates: [...this.state.templates, childState]})
    }

    this.setState({modalIsVisible: false})
    this.setState({lastCommonHeaderName: lastCommonHeaderName})
  }

  deleteTemplate = (e) => {
    const id = e.target.parentNode.attributes.listid?.value
    if ( id ) {
      const templateIndex = this.state.templates.slice().findIndex(tmp => {
        return tmp.id == id
      })

      if ( templateIndex > -1 ) {
        const currentTemplates = this.state.templates
        currentTemplates.splice(templateIndex, 1)

        this.setState({templates: currentTemplates})
      }

    }
  }

  useTemplate = async (e) => {
    const templateObj = this.findTemplateObject(e)
    if ( !templateObj ) return

    const text = templateObj.simpleText

    const index = templateObj.insertMarkIndex
    let clipboardText = ''

    await navigator.clipboard.readText()
      .then(text => { clipboardText = text })
      .catch(err => { console.log(err) })


    if ( clipboardText === '' ) return

    const newText = this.commonSplice(text, index, 0, clipboardText)

    var blob = new Blob([newText], {type: 'text/plain'});
    var item = new ClipboardItem({'text/plain': blob});

    await navigator.clipboard.write([item])
      .then(t => console.log(1))
      .catch(e => console.log(e))

  }

  editTemplate = (e) => {
    const templateObj = this.findTemplateObject(e)
    if ( !templateObj ) return

    this.setState(() => {

      setTimeout(() => {
        console.log('this.state', this.state)
      }, 1000)
      return {modalIsVisible: true, editMode: {active: true, templateObj: templateObj}}
    })
  }

  editModeOff = () => {
    this.setState({editMode: {active: false}})
  }

  findTemplateObject = (element) => {
    const id = element.target.parentNode.parentNode.attributes?.listid?.value;
    console.log({id})
    if ( !id ) return null

    const templateObj = this.state.templates.find( template => { console.log( template.id, id ); return template.id == id } )
    console.log({templateObj})
    return templateObj
  }

  commonSplice = (clipboardText, idx, rem, str) => {
    return clipboardText.slice(0, idx) + str + clipboardText.slice(idx + Math.abs(rem))
  }

  componentDidMount() {
    const templates = JSON.parse(localStorage.getItem('templates'))
    if ( templates ) this.setState({templates: templates})
  }

  componentDidUpdate() {
    const canculateLastName = () => {
    const templates = this.state.templates
    let maxNumber = 0
    const numbers = []
      templates.forEach(template => {
        const matchObj = template.headerTemplate.match(/^Template_(\d+)$/, 'g')
        if ( matchObj && matchObj[1] ) {
          numbers.push(parseFloat(matchObj[1]))
        } else { return 'Template_0' }
        maxNumber = Math.max.apply(null, numbers)
      })
      return 'Template_' + (maxNumber + 1)
    }

    lastCommonHeaderName = canculateLastName()
    localStorage.setItem('templates', JSON.stringify(this.state.templates))
  }

  render = () => {
    return (
      <div id={s.root}>
        <button id={s.addTemplate} onClick={this.invokeModal}><span>+</span></button>
        <TemplateList 
          templates={this.state.templates} 
          deleteTemplate={this.deleteTemplate} 
          useTemplate={this.useTemplate} 
          editTemplate={this.editTemplate}
        />

        { this.state.modalIsVisible ?
          <AddTemplateModal
            isActive={this.state.modalIsVisible}
            closeModal={this.closeModal}
            saveTemplate={this.saveTemplate}
            lastCommonHeaderName={lastCommonHeaderName}
            editInfo={this.state.editMode}
            editModeOff={this.editModeOff}/>
          : ''
        }
      </div>
    )
  }
}

export default Templates
