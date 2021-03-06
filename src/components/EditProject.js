import React from 'react'

export default class EditProject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.project,
      projectId: this.props.projectId
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
    let project = this.state
    this.props.editProject(project)
    this.props.showEditProject()
  }

  render() {
    return(
      <div id="edit-project-component">
        <form onSubmit={this.handleSubmit} id="edit-project-form">
          <input type="text" name="name" onChange={this.handleChange} value={this.state.name} required/>
          <button className="btn submit-btn" type="submit">Edit Project Name </button>
        </form>
      </div>
    )
  }
}
