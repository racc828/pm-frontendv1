import React from 'react'

export default class SubmitTask extends React.Component {

  constructor() {
    super()

    this.state ={
      title: "",
      description: "",
      completed: false
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
    let newTask = this.state
    this.props.createTask(newTask)
  }

  render() {
    return(
      <div id="submit-task-component">
        <form onSubmit={this.handleSubmit} id="submit-task-form">
          <input type="text" name="title" onChange={this.handleChange} placeholder="Title" required/>
          <input type="text" name="description" onChange={this.handleChange} placeholder="Description" required/>
          <button className="btn submit-btn" type="submit">Add Task </button>
        </form>
      </div>
    )
  }

}
