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
      let responseText;
      let color;
      if ( imgItem.fromResponse && imgItem.fromResponse.errorDetails ) {
        responseText = imgItem.fromResponse.errorDetails
        color = '#ff1433'
      } else if ( imgItem.fromResponse && imgItem.fromResponse.oldWidth && imgItem.fromResponse.oldWidth === imgItem.fromResponse.width ) {
        responseText = 'Width - ' + imgItem.fromResponse.oldWidth + '. no need to compress'
        color = '#afafaf'
      } else if ( imgItem.fromResponse && imgItem.fromResponse.oldWidth && imgItem.fromResponse.oldWidth !== imgItem.fromResponse.width ) {
        responseText = 'Ready'
        color = '#1ee01e'
      }


      layout.push(
      <li key={i}>
        <div>

        <div filepath={imgItem.path} className={[s.divToProcessing, s.hastooltip].join(' ')} >
          {imgItem.name}
          <div className={s.tooltipwrapper}><div className={s.tooltip}>{imgItem.name}</div></div>
        </div>
          <button onClick={this.removeItem} itemKey={i} className={s.deleteOneButton}>X</button>
        </div>
        <div className={s.divProcessed} style={{color: color}}>
        { responseText }
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
          <ul>
            {this.showimgList()}
          </ul>
        {/* </div> */}
      </div>

      </>)
  }
}

export default MainPage
