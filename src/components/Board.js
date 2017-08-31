import React from 'react'
import Project from './Project'
import ProjectsAdapter from '../adapters/ProjectsAdapter'

export default class Board extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentUser:{},
      projects: [],
      activeProject: this.props.activeProject
      }
    }

  render(){
    return(
      <div>
        {this.props.filteredProjects.map((project, i) =>
          <Project project={project} key={i}/>
          )}
      </div>
    )
  }


}
