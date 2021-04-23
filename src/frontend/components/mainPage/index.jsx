import React from 'react'
import s from './styles/index.module.css'
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

  componentDidMount() {
    ipcRenderer.invoke('initialLoad').then((response) => {
      this.setState((state, props) => {
        return { imgList: response}
      })
    })
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
    console.log('this.state.imgList', this.state.imgList)
    ipcRenderer.invoke('compressAll', [this.state.imgList, this.state.widthNumber]).then((responseImgObj) => {
      console.log({responseImgObj})
      this.setState((state, props) => {
        const changedState = processResponse(state.imgList, responseImgObj)
        return changedState
      })
      setTimeout(() => {
        console.log(this.state.imgList)
      }, 2000);
    })

    function processResponse(stateArray, responseImgObj) {
      const mapped = stateArray.map((imgObj, i) => {
        return {...imgObj, fromResponse: responseImgObj[i]}
      })
      return { imgList: mapped }
    }
  }

  addimgName = (fileName) => {
    this.setState((state, props) => {
      return { imgList: [...state.imgList, fileName]}
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

  render() {
    return(<>
      <div id={s.container}>
        <div id={s.topSection}>
          <div className={s.paragraphSection}>
            - How much width? <br />
            - <input type="number" onChange={this.inputChange} value={this.state.widthNumber}/><br />
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
        <ConfirmationWindow confirmationHandle={this.confirmationHandle} confirmationWindow={this.state.confirmationWindow}/>
      </div>
      </>)
  }
}

export default MainPage
