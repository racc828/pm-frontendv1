import React from 'react'

export default class EditList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      id: this.props.listId
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
    let list = this.state
    this.props.editList(list)
  }


  render() {
    return(
      <div id="edit-list-component">
        <form onSubmit={this.handleSubmit} id="edit-list-form">
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="List Name" required autoFocus/>
          <button className="btn submit-btn" type="submit">Edit List Name </button>
        </form>
      </div>
    )
  }
}
