import React from 'react'
import s from './styles/fileLoadInput.module.scss'

class FileLoadInput extends React.Component {
  constructor(props) {
    super(props)
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const imagesArray = []

    this.fileInput.current.files.forEach(imgObject => {
      if ( checkIfImage(imgObject) ) {
        imagesArray.push({name: imgObject.name, path: imgObject.path})
      }
    })

    this.props.addimgName(imagesArray)

    function checkIfImage(imgObject) {
      // console.log(imgObject)
      return imgObject.type.startsWith('image/')
    }
  }

  render() {
    return(<>
      <div className={s.input__wrapper} onMouseDown={this.props.mouseDownAnimation}>
        <input type="file" name="file" id="input__file" className="input input__file" hidden ref={this.fileInput} multiple onChange={this.handleSubmit} />
        <label htmlFor="input__file">Choose your imgs</label>
      </div>
    </>)
  }
}

export default FileLoadInput
