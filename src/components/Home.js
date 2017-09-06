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
      activeProject: 9000,
      showAddProject:false
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
           let index = this.state.projects.findIndex(projectState=> projectState.id === project.projectId)
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

  showAddProject = () => this.setState({showAddProject: !this.state.showAddProject})

  render() {
    return(
      <div id="home-wrapper">
        <div className="top-header">
          <div className="top-header-left">
               <div> {this.state.currentUser.firstname} </div>
           </div>
           <div className="top-header-right">
             <a> My Tasks </a>
             <button className="log-out btn" onClick={this.props.logOut}>Log Out</button>
           </div>
         </div>
         <div className="side-bar">
          <div>
            <h6 className="projects-side-header">PROJECTS
              <button className="float-right add-project-btn circle-btn" onClick={this.showAddProject}><i className="fa fa-plus"></i>
              </button>
            </h6>
             </div>
           {this.state.showAddProject ? <SubmitProject currentUser={this.state.currentUser} createProject={this.createProject} /> :null}
           <ProjectOptions projects={this.state.projects} setActiveProject={this.setActiveProject} deleteProject={this.deleteProject}/>
         </div>
         <div className="board-container">
           <Board editProject={this.editProject} filteredProjects={this.filterProject()} activeProject={this.state.activeProject} currentUser={this.state.currentUser} />
         </div>
      </div>
    )
  }

}
