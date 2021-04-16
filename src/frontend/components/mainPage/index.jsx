import React from 'react'
import s from './styles/index.module.css'
import FileLoadInput from './fileLoadInput.jsx'
import { throws } from 'assert'
const { ipcRenderer } = require('electron')

class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imgList: []
    }
  }

  componentDidMount() {
    ipcRenderer.invoke('initialLoad').then((response) => {
      this.setState((state, props) => {
        return { imgList: response}
      })
    })
  }

  removeItem = (event) => {
    const itemId = event.target.attributes.itemKey.value
    console.log(itemId)
    this.setState((state, props) => {
    const stateArray = state.imgList
    stateArray.splice(itemId, 1)
      return { imgList: stateArray }
    })
  }

  showimgList = () => {
    let layout = []
    this.state.imgList.forEach((imgItem, i) => {
      layout.push(
      <li key={i}>
        <div filePath={imgItem.path}>
          {imgItem.name}
          <button onClick={this.removeItem} itemKey={i}>X</button>
        </div>
        <div>

        </div>
      </li>
      )
    })
    return layout
  }

  clearAll = () => {
    this.setState((state, props) => {
      return { imgList: []}
    })
  }

  compressAll = () => {
    ipcRenderer.invoke('compressAll').then((response) => {
      console.log(response)
      // this.setState((state, props) => {
      //   return { imgList: response }
      // })
    })
  }

  addimgName = (fileName) => {
    this.setState((state, props) => {
      return { imgList: [...state.imgList, fileName]}
    })
  }
  // updateimgList = () => {
  //   this.setState({...imgList, })
  // }

  render() {
    return(<>
      <div id={s.container}>
        <div id={s.imgList}>
          <ul>
            {this.showimgList()}
          </ul>
        </div>
      </div>
      <div id={s.buttonSection}>
        <div id={s.topButtons}>
          <button onClick={this.clearAll}>Clear all</button>
          <button onClick={this.compressAll}>Compress all</button>
        </div>
        <FileLoadInput addimgName={this.addimgName}/>
      </div>
      </>)
  }
}

export default MainPage
