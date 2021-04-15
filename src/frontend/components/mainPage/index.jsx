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

  showimgList = () => {
    let layout = []
    this.state.imgList.forEach((imgItem, i) => {
      layout.push(
      <li key={i}>
        <div>
          {imgItem}
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
    console.log(this.state.imgList)
    // this.state.imgList
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
          <button>Compress all</button>
        </div>
        <FileLoadInput addimgName={this.addimgName}/>
      </div>
      </>)
  }
}

export default MainPage
