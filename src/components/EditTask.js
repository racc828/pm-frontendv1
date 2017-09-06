import React from 'react'

export default class EditTask extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      description: this.props.description,
      title: this.props.title,
      id: this.props.id
    }
  }

  handleChange = (e) => {
    let property = e.target.name
    let value = e.target.value
    console.log(property, value)
    this.setState({
      [property]: value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let task = this.state
    this.props.editTask(task)
    this.props.showEditTask()
  }

  render() {
    return(
      <div id="edit-task-component">
        <form onSubmit={this.handleSubmit} id="edit-task-form">
          <input type="text" name="title" onChange={this.handleChange} placeholder="Title" value={this.state.title} required autoFocus/>
          <input type="text" name="description" onChange={this.handleChange} placeholder="Description" value={this.state.description} required/>
          <button className="btn submit-btn" type="submit">Add Task </button>
        </form>
      </div>
    )
  }

}
