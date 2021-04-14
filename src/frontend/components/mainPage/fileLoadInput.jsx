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
    this.props.addPdfName(this.fileInput.current.files[0].name)

    // console.log(
    //   this.fileInput.current.files[0].name
    // )
  }
  
  render() {
    return(<> 
      <div className={s.input__wrapper}>
        <input type="file" name="file" id="input__file" className="input input__file" hidden ref={this.fileInput} multiple onChange={this.handleSubmit}/>
        <label htmlFor="input__file">Choose your pdfs</label>
      </div>
    </>)
  }
  
}

export default FileLoadInput