import React from 'react'

class Templates extends React.Component {
  constructor(props) {
    super(props)
  }

  click = (e) => {
    console.log(e.target.selectionStart)
  }

  render = () => {
    return(
      <div>
        Hello
        <div name="" id="" cols="30" rows="10" onClick={this.click}>rkeslkrjaklsejr serjalsejrlk ajs;lker</div>
      </div>
    )
  }
}

export default Templates
