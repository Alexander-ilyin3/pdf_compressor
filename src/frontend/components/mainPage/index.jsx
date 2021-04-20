import React from 'react'
import s from './styles/index.module.css'
import FileLoadInput from './fileLoadInput.jsx'
import PicList from './picList'
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

  setParentState = (newState) => {
    this.setState((state, props) => {
      return newState
    })
  }

  clearAll = () => {
    this.setState((state, props) => {
      return { imgList: []}
    })
  }

  compressAll = () => {
    console.log('this.state.imgList', this.state.imgList)
    ipcRenderer.invoke('compressAll', this.state.imgList).then((responseImgObj) => {
      console.log({responseImgObj})
      this.setState((state, props) => {
        const changedState = processResponse(state.imgList, responseImgObj)
        return changedState
      })
      setTimeout(() => {
        console.log(this.state.imgList)
      }, 2000);
      // this.setState((state, props) => {
      //   return { imgList: response }
      // })
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
  // updateimgList = () => {
  //   this.setState({...imgList, })
  // }

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

  render() {
    return(<>
      <div id={s.container}>
      <div id={s.buttonSection}>
        <div id={s.topButtons}>
          <button onClick={this.clearAll} onMouseDown={this.mouseDownAnimation}>Clear all</button>
          <button onClick={this.compressAll} onMouseDown={this.mouseDownAnimation}>Compress all</button>
        </div>
        <FileLoadInput addimgName={this.addimgName} mouseDownAnimation={this.mouseDownAnimation}/>
      </div>
        {/* <div id={s.imgList}> */}
        <PicList imgList={this.state.imgList} setParentState={this.setParentState}/>
          {/* <ul> */}
            {/* {this.showimgList()} */}
          {/* </ul> */}
        {/* </div> */}
      </div>

      </>)
  }
}

export default MainPage
