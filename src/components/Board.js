import React from 'react'
import Project from './Project'
import ProjectsAdapter from '../adapters/ProjectsAdapter'

export default class Board extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentUser:{},
      projects: [],
      activeProject: 1
      }
    }

  render(){
    return(
      <div className="board-component">
        {this.props.filteredProjects.map((project, i) =>
          <Project project={project} key={i} activeProject={this.state.activeProject}/>
          )}
      </div>
    )
  }


}
