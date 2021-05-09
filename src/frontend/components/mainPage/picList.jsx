// import { render } from 'enzyme';
import React from 'react'
import s from './styles/index.module.scss'

class PicList extends React.Component {
  constructor(props) {
    super(props)
    // this.layout = []
  }

  removeItem = (event) => {
    const itemId = event.target.attributes.itemkey.value
    console.log(itemId)
    // this.setState((state, props) => {
    const stateArray = this.props.imgList
    stateArray.splice(itemId, 1)
    this.props.setParentState({ imgList: stateArray })
      // return
    // })
  }

  prepeareColoring = (imgList) => {
    return imgList.map((imgItem, i) => {
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

      // return { ...imgItem, responseText: responseText, color: color }

      return (
      <li key={i}>
        <div>
        <div filepath={imgItem.path} className={[s.divToProcessing, s.hastooltip].join(' ')} >
          {imgItem.name}
          <div className={s.tooltipwrapper}><div className={s.tooltip}>{imgItem.name}</div></div>
        </div>
          <button onClick={this.removeItem} itemkey={i} className={s.deleteOneButton}>X</button>
        </div>
        <div className={s.divProcessed} style={{color: color}}>
        { responseText }
        </div>
      </li>
      )
    })
  }

  render() {
    // const layout = []


    return (<ul>
      {this.prepeareColoring(this.props.imgList)}
      </ul>)
  }
  // return layout
}

export default PicList
