import React from 'react'

export default class SubmitList extends React.Component {

  constructor() {
  super()

    this.state = {
      name: ""
    }
  }

  handleChange = (e) => {
    let property = e.target.name
    let value = e.target.value
    this.setState({
      [property]:value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let newList = this.state
    this.props.createList(newList)
  }

  render() {
    return(
      <div id="submit-list-component">
        <form onSubmit={this.handleSubmit} id="submit-list-form">
          <input type="text" name="name" onChange={this.handleChange} placeholder="List Name" required/>
          <button className="btn submit-btn" type="submit">Add List </button>
        </form>
      </div>
    )
  }

}
