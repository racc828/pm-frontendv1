import React from 'react'

export default class SubmitProject extends React.Component {
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
    let newProject = this.state
    this.props.createProject(newProject)
    e.target.reset()
  }

  render() {
    return(
      <div id="submit-project-component">
        <form onSubmit={this.handleSubmit} id="submit-project-form">
          <input type="text" name="name" onChange={this.handleChange} placeholder="Project Name" required/>
          <button className="btn submit-btn" type="submit">Add Project </button>
        </form>
      </div>
    )
  }
}
