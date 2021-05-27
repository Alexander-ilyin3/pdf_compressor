import React from 'react'
import TemplateList from './templateList.jsx'
import AddTemplateModal from './addTemplateModal.jsx'
import s from './styles/index.module.scss'
const { ipcRenderer } = require('electron')

let lastCommonHeaderName = 'Template_1'
let timeout;

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
      },
      useAnimation: {
        active: false,
        liId: 0
      },
      lastCopiedContent: '',
      lastUsedTemplateId: 0
    }
  }

  click = (e) => {
    // console.log(e.target.selectionStart)
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
          // console.log('CHANGED CHILD', childState)
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
    console.log('clipboard text', clipboardText)
    await navigator.clipboard.readText()
      .then(text => { clipboardText = text })
      .catch(err => { console.log(err) })


    if ( clipboardText === '' ) return

    const newText = this.commonSplice(text, index, 0, clipboardText)

    this.useAnimation(templateObj)

    if ( templateObj.id === this.state.lastUsedTemplateId && clipboardText === this.state.lastCLipboardContent ) return
    this.setState({lastUsedTemplateId: templateObj.id, lastCLipboardContent: newText})

    var blob = new Blob([newText], {type: 'text/plain'});
    var item = new ClipboardItem({'text/plain': blob});

    await navigator.clipboard.write([item])
      .then( async t => { })
      .catch(e => console.log(e))
  }

  useAnimation = (templateObj) => {
    // console.log('ANIMATION',  templateObj.id)
    this.setState( { useAnimation: { active: true, liId: templateObj.id } } )

    if ( timeout ) clearTimeout( timeout )
      timeout = setTimeout(() => {
      this.setState( { useAnimation: { active: false, liId: 0 } } )
    }, 1000)
  }

  editTemplate = (e) => {
    const templateObj = this.findTemplateObject(e)
    if ( !templateObj ) return

    this.setState(() => {


      setTimeout(() => {
        // console.log('this.state', this.state)
      }, 1000)
      return {modalIsVisible: true, editMode: {active: true, templateObj: templateObj}}
    })
  }

  editModeOff = () => {
    this.setState({editMode: {active: false}})
  }

  findTemplateObject = (element) => {
    const id = element.target.parentNode.parentNode.attributes?.listid?.value;
    // console.log({id})
    if ( !id ) return null

    const templateObj = this.state.templates.find( template => { console.log( template.id, id ); return template.id == id } )
    // console.log({templateObj})
    return templateObj
  }

  commonSplice = (clipboardText, idx, rem, str) => {
    return clipboardText.slice(0, idx) + str + clipboardText.slice(idx + Math.abs(rem))
  }

  componentDidMount = async () => {
    await new Promise((rs,rj) => {

      ipcRenderer.invoke('templateControls', ['load']).then((response) => {
        // console.log('from DB on front ', response )
        if ( !response || (response.length && response.length === 0 )) { rs(); return }

        this.setState((state, props) => {
          rs(); return response
        })
      })
    })

    const setOrdersToTemplates = () => {
      this.setState(state => {
        const currentTemplates = state.templates
        let orderedTemplates;
        // console.log('state.templates', state.templates)

        const notOrderedItemExists = currentTemplates.find(template => {
          // console.log('template.order', template.order)
          return template.order === undefined
        })

        if ( notOrderedItemExists ) {
          // console.log('no order')
          orderedTemplates = currentTemplates.map( (template, i) => {
            // console.log({ ...template, order: i })
            return { ...template, order: i }
          })
          return { templates: orderedTemplates}
        }
      })
    }
    setOrdersToTemplates()
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
      ipcRenderer.invoke('templateControls', ['set', this.state]).then((response) => {
        // console.log('on front - ', response)
      })
      // console.log('this.state.lastCopiedContent', this.state.lastCopiedContent)
  }

  highlightCard = (card) => {
    const cardId = card?.attributes?.listid?.value
    //if ( !cardId ) return

    this.setState(state => {
      const newState = state.templates.map( template => {

        if ( cardId && template.id == cardId ) return { ...template, highlighted: true }
        return { ...template, highlighted: false }
      })
      // console.log(this.state.templates)
      return { templates: newState }
    })
  }

  changeCardsOrder = (isDragged, draggedOn) => {
    // console.log('isDragged', isDragged, 'draggedOn', draggedOn)
    this.setState(state => {
      const currentTemplates = state.templates

      const stateIsDragged = currentTemplates.find( t => {
        return t.id == isDragged.id
      })

      const stateDraggedOn = currentTemplates.find( t => {
        return t.id == draggedOn.id
      })

      if ( !stateIsDragged || !stateDraggedOn ) return

      const newTemplatesOrder = currentTemplates.map( template => {
        // console.log(template.id, stateDraggedOn.id, stateIsDragged.id)
        if ( template.id ===  stateDraggedOn.id ) {
          return { ...template, order: stateIsDragged.order}
        }
        if ( template.id ===  stateIsDragged.id ) {
          return { ...template, order: stateDraggedOn.order}
        }
        return template
      })
      return { templates: newTemplatesOrder }
    })
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
          useAnimation={this.state.useAnimation}
          highlightCard={this.highlightCard}
          changeCardsOrder={this.changeCardsOrder}
        />

        { this.state.modalIsVisible ?
          <AddTemplateModal
            isActive={this.state.modalIsVisible}
            closeModal={this.closeModal}
            saveTemplate={this.saveTemplate}
            lastCommonHeaderName={lastCommonHeaderName}
            editInfo={this.state.editMode}
            editModeOff={this.editModeOff}
            lastOrderIndex={this.state.templates?.length ? this.state.templates.length : 0}/>
          : ''
        }
      </div>
    )
  }
}

export default Templates
