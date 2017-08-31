import React from 'react'
import Project from './Project'

export default class ProjectOptions extends React.Component {

handleClick = (e) => {
  let activeProject = e.target.dataset.id
  this.props.setActiveProject(activeProject)
}

render() {
  return(
    <div>
      {this.props.projects.map((project, i) =>
        <div className="side-list-btn-container" key={i}>
          <button onClick={this.handleClick}>
            <div data-id={project.id}>{project.name}</div>
          </button>
        </div> )}
    </div>
  )
}


}
