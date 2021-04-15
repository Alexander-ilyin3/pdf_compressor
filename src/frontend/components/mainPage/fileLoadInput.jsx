import React from 'react'
import s from './styles/fileLoadInput.module.css'

class FileLoadInput extends React.Component {
  constructor(props) {
    super(props)
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit = (event) => {
    event.preventDefault()

    this.fileInput.current.files.forEach(imgObject => {
      if ( checkIfImage(imgObject) ) {
        this.props.addimgName(imgObject.name)

      }
    })
    function checkIfImage(imgObject) {
      console.log(imgObject)
      return imgObject.type.startsWith('image/')
    }
  }

  render() {
    return(<>
      <div className={s.input__wrapper}>
        <input type="file" name="file" id="input__file" className="input input__file" hidden ref={this.fileInput} multiple onChange={this.handleSubmit}/>
        <label htmlFor="input__file">Choose your imgs</label>
      </div>
    </>)
  }

}

export default FileLoadInput
