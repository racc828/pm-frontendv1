import React from 'react'
import ListsAdapter from '../adapters/ListsAdapter'
import ProjectsAdapter from '../adapters/ProjectsAdapter'
import CollaboratorsAdapter from '../adapters/CollaboratorsAdapter'
import UsersAdapter from '../adapters/UsersAdapter'
import List from './List'
import EditProject from './EditProject'
import AddCollaborator from './AddCollaborator'
import SubmitList from './SubmitList'
import Collaborator from './Collaborator'

export default class Project extends React.Component {
  constructor(props) {

    super(props)
    this.state = {
      lists: [],
      collaborators: [],
      showEditProject: false,
      users: [],
      selectedCollaborator: null
    }
  }

  componentDidMount() {

    // this.props.lists ?
    //   this.setState( {lists:this.props.lists} ) : this.setState( {lists:[]})


    CollaboratorsAdapter.getCollaborators(this.props.project.id)
    .then( collaborators => {
        return collaborators.filter((collaborator) => {
          return collaborator.project_id === this.props.project.id
        })
      })
      .then(data => {
        this.setState({
          collaborators: data
        })
      })

    UsersAdapter.getUsers()
    .then( users => {
        let index = users.findIndex(user=> user.id === this.props.currentUser.id)
        users.splice(index, 1)
        this.setState({users})
      })

  }

  componentWillReceiveProps(nextProps) {
    nextProps.lists ?
      this.setState( {lists:nextProps.lists} ) : this.setState( {lists:[]})


    // CollaboratorsAdapter.getCollaborators(this.props.project.id)
    // .then( collaborators => {
    //     return collaborators.filter((collaborator) => {
    //       return collaborator.project_id === this.props.project.id
    //     })
    //   })
    //   .then(data => {
    //     this.setState({
    //       collaborators: data
    //     })
    //   })

      UsersAdapter.getUsers()
      .then( users => {
          let index = users.findIndex(user=> user.id === this.props.currentUser.id)
          users.splice(index, 1)
          this.setState({users})
        })

    }

  createList = (newList) => {
    ListsAdapter.createList(newList, this.props.project.id)
    .then(data => this.setState({
        lists: [...this.state.lists, data]
      }))
  }

  editList = (list) => {
    ListsAdapter.editList(list, this.props.project.id)
    .then( data => {
        let index = this.state.lists.findIndex(stateList=> stateList.id === list.id)
        this.setState({
            lists: [
             ...this.state.lists.slice(0,index),
             Object.assign({}, this.state.lists[index], data),
             ...this.state.lists.slice(index+1)
           ]
         });
      })
  }


  deleteList = (list) => {
    ListsAdapter.deleteList(list, this.props.project.id)
    .then(data => this.setState({
        lists: data
      }))
  }

  submitCollaborator = (e) => {
    e.preventDefault()
    CollaboratorsAdapter.createCollaborator(parseInt(this.state.selectedCollaborator), this.props.project.id)
    .then(data => this.setState({
      collaborators: [...this.state.collaborators, data]
    }))
  }

  collaboratorHandleChange = (e) => {
    let collaboratorValue = e.target.value
    this.setState({
      selectedCollaborator: collaboratorValue
    })
  }

  showEditProject = () => this.setState({showEditProject: !this.state.showEditProject})

  render() {
    return(
      <div className="project-component">
        <div className="project-name-header">
          { this.state.showEditProject ? <EditProject project={this.props.project.name} editProject={this.props.editProject} projectId = {this.props.project.id} showEditProject={this.showEditProject}/> : <h1>{this.props.project.name}
            <button className="edit-project-btn" onClick={this.showEditProject}> <i className="fa fa-pencil"></i>
            </button>
          </h1>}
        </div>
         {this.state.collaborators.map((collaborator, i) => {
           return <Collaborator users={this.state.users}  key={i} collaborator={collaborator}/>
         })}
         <div className="hide-collaborators">
            <form onSubmit={this.submitCollaborator} >
               <select onChange={this.collaboratorHandleChange}>
                 <option>Add a collaborator</option>
                 {this.state.users.map((user, i) => {
                   return <AddCollaborator key={i} collaborator={user}/>
                 })}
              </select>
              <button type="submit"> Add </button>
            </form>
        </div>
        <div className="main-list-container">
          <SubmitList createList={this.createList} />
          {this.state.lists.map((list, i) => {
            return <List editList={this.editList} deleteList={this.deleteList} list={list} key={i} projectId={this.props.project.id}/>
          })}
        </div>
      </div>
    )
  }
}
