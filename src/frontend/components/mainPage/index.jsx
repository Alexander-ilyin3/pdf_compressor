import React from 'react'
import s from './styles/index.module.css'
import FileLoadInput from './fileLoadInput.jsx'
import { throws } from 'assert'
const { ipcRenderer } = require('electron')

class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pdfList: []
    }
  }

  componentDidMount() {
    ipcRenderer.invoke('initialLoad').then((response) => {
      this.setState((state, props) => {
        return { pdfList: response} 
      })
    })
  }

  showPdfList = () => {
    let layout = []
    this.state.pdfList.forEach(pdfItem => {
      layout.push(<li>{pdfItem}</li>)
    })
    return layout
  }

  clearAll = () => {
    this.setState((state, props) => {
      return { pdfList: []} 
    })
    console.log(this.state.pdfList)
    // this.state.pdfList
  }

  addPdfName = (fileName) => {
    this.setState((state, props) => {
      return { pdfList: [...state.pdfList, fileName]} 
    })
  }
  // updatePdfList = () => {
  //   this.setState({...pdfList, })
  // }

  render() {
    return(<>
      <div id={s.container}> 
        <div id={s.pdfList}>
          <ul>
            {this.showPdfList()}
          </ul>
        </div>
      </div>
      <div id={s.buttonSection}>
        <div id={s.topButtons}>
          <button onClick={this.clearAll}>Clear all</button>
          <button>Compress all</button>
        </div>
        <FileLoadInput addPdfName={this.addPdfName}/>
      </div>
      </>)
  }
}

export default MainPage