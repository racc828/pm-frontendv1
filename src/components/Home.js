import React from 'react'
import SessionsAdapter from '../adapters/SessionsAdapter'
import ProjectsAdapter from '../adapters/ProjectsAdapter'
import ProjectOptions from './ProjectOptions'
import Board from './Board'
import Project from './Project'
import SubmitProject from './SubmitProject'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      currentUser: {},
      projects: [],
      activeProject: 1
    }
  }

  componentDidMount(){
    SessionsAdapter.currentUser()
      .then( data => {
        this.setState({
          currentUser: data
        })
      })
      .then( () => {
        ProjectsAdapter.getProjects(this.state.currentUser)
          .then( projects => {
            this.setState({projects: projects})
          })
        })
     }

   editProject = (project) => {
       return ProjectsAdapter.editProject(project, this.props.currentUser)
         .then( data => {
           console.log(data)
           let index = this.state.projects.findIndex(projectState=> projectState.id === project.projectId)
           console.log(index)
           debugger
           this.setState({
               projects: [
                ...this.state.projects.slice(0,index),
                Object.assign({}, this.state.projects[index], data),
                ...this.state.projects.slice(index+1)
              ]
            });
         })
     }

  createProject = (newProject) => {
    ProjectsAdapter.createProject(newProject, this.state.currentUser)
    .then(newData => {
      this.setState({
        projects: [...this.state.projects, newData]
      })
    })
  }

  deleteProject = (project) => {
    ProjectsAdapter.deleteProject(project, this.state.currentUser)
    .then(newData => {
      this.setState({
        projects: newData
      })
    })
  }

  setActiveProject = (activeProject) => {
    this.setState({
      activeProject: activeProject
    })
  }

  filterProject = () => {
    if(this.state.activeProject == null) {
      return this.state.projects
    } else {
     return this.state.projects.filter(project => project.id === parseInt(this.state.activeProject))
    }
  }

  render() {
    return(
      <div id="home-wrapper">
        <div className="top-header">
          <div className="top-header-left">
               <button onClick={this.props.logOut}>Sign Out {this.state.currentUser.firstname} </button>
           </div>
           <div className="top-header-right">
             <p>HEY {this.state.currentUser.firstname}</p>
           </div>
         </div>
         <div className="side-bar">
           <h6>Projects</h6>
           <button className="float-right"><i className="fa fa-plus"></i></button>
           <SubmitProject currentUser={this.state.currentUser} createProject={this.createProject} />
           <ProjectOptions projects={this.state.projects} setActiveProject={this.setActiveProject} deleteProject={this.deleteProject}/>
         </div>
         <div className="board-container">
           <Board editProject={this.editProject} filteredProjects={this.filterProject()} activeProject={this.state.activeProject} currentUser={this.state.currentUser} />
         </div>
      </div>
    )
  }

}
