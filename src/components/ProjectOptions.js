import React from 'react'
import Project from './Project'

export default class ProjectOptions extends React.Component {



handleClick = (e) => {
  let activeProject = e.target.dataset.id
  this.props.setActiveProject(activeProject)
}

handleDelete = (e) => {
  let targetProject = parseInt(e.currentTarget.dataset.id)
  this.props.deleteProject(targetProject)
}

render() {
  return(
    <div>
      {this.props.projects.map((project, i) =>
        <div className="side-list-btn-container" key={i}>
          <button onClick={this.handleClick} data-id={project.id}>
            {project.name}
          </button>
          <button onClick={this.handleDelete} data-id={project.id}>
            <i className="fa fa-trash-o"> </i>
          </button>
        </div> )}
    </div>
  )
}


}
