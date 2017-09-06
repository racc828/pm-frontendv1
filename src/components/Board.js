import React from 'react'
import Project from './Project'
import ProjectsAdapter from '../adapters/ProjectsAdapter'

export default class Board extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentUser:{},
      }
    }

  render(){
    return(
      <div className="board-component">
        {this.props.filteredProjects.map((project, i) =>
          <Project project={project} key={i}
            lists={project.lists} currentUser={this.props.currentUser} editProject={this.props.editProject}/>
          )}
      </div>
    )
  }


}
