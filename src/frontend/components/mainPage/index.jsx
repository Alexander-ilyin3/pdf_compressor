import React, { useState } from 'react'
import s from './styles/index.module.scss'
import FileLoadInput from './fileLoadInput.jsx'
import PicList from './picList'
import ConfirmationWindow from './confirmationWindow'
const { ipcRenderer } = require('electron')

class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imgList: [],
      confirmationWindow: false,
      widthNumber: 1200
    }
  }

  async componentDidMount() {
    // ipcRenderer.invoke('initialLoad').then((response) => {
    //   this.setState((state, props) => {
    //     return { imgList: response}
    //   })
    // })
    try {
      const state = JSON.parse(localStorage.getItem('state', state))
      this.setState(state)
    } catch(e) { console.log('state nema') }

    document.title = 'Ciklum helper - ' + await getAppVersion()
    async function getAppVersion() {
      return new Promise((rs,rj) => {
        ipcRenderer.invoke('getAppVersion', []).then((appVersion) => {
          rs(appVersion)
        })
      })
    }
  }

  componentDidUpdate = () => {
    this.updateStorage(this.state)
  }

  setParentState = (newState) => {
    this.setState((state, props) => {
      return newState
    })
  }

  clearAll = () => {
    this.setState((state, props) => {
      return { confirmationWindow: true }
    })
  }

  compressAll = () => {
    // console.log('this.state.imgList', this.state.imgList)
    ipcRenderer.invoke('compressAll', [this.state.imgList, this.state.widthNumber]).then((responseImgObj) => {
      // console.log({responseImgObj})
      this.setState((state, props) => {
        const changedState = processResponse(state.imgList, responseImgObj)
        return changedState
      })
      setTimeout(() => {
        // console.log(this.state.imgList)
      }, 2000);
    })

    function processResponse(stateArray, responseImgObj) {
      const mapped = stateArray.map((imgObj, i) => {
        return {...imgObj, fromResponse: responseImgObj[i]}
      })
      return { imgList: mapped }
    }
  }

  addimgName = (picArray) => {
    this.setState((state, props) => {
      return { imgList: [...state.imgList, ...picArray]}
    })
  }

  mouseDownAnimation = async (event) => {
    let target;
    if (event.target.htmlFor === "input__file") {
      target = event.target.parentNode
    } else {
      target = event.target
    }
    target.setAttribute('wasClicked', 'true')
    setTimeout(() => {
      target.setAttribute('wasClicked', 'false')
    }, 100);
  }

  confirmationHandle = (event) => {
    const value = event.target.attributes.value.value
    if ( value ==='yes' ) {
      this.setState({imgList: []})
    }
    this.setState({confirmationWindow: false})
  }

  inputChange = (e) => {
    this.setState({widthNumber: e.target.value});
  }

  updateStorage = (state) => {
    localStorage.setItem('state', JSON.stringify(state))
    // console.log(' -==========- ',state)
  }

  render() {

    return(<>
      <ConfirmationWindow confirmationHandle={this.confirmationHandle} confirmationWindow={this.state.confirmationWindow}/>
      <div id={s.container}>
        <div id={s.topSection}>
          <div className={s.paragraphSection}>
            - How much width? <br />
            - Near <input type="number" onChange={this.inputChange} value={this.state.widthNumber}/><br />
            - Such much? <br />
            - For whom how.
          </div>
          <div id={s.buttonSection}>
            <div id={s.topButtons}>
              <button onClick={this.clearAll} onMouseDown={this.mouseDownAnimation}>Clear all</button>
              <button onClick={this.compressAll} onMouseDown={this.mouseDownAnimation}>Compress all</button>
            </div>
            <FileLoadInput addimgName={this.addimgName} mouseDownAnimation={this.mouseDownAnimation}/>
          </div>
      </div>
        <PicList imgList={this.state.imgList} setParentState={this.setParentState}/>
      </div>
      </>)
  }
}

export default MainPage
