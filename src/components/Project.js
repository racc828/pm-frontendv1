import React from 'react'
import ListsAdapter from '../adapters/ListsAdapter'
import ProjectsAdapter from '../adapters/ProjectsAdapter'
import List from './List'
import EditProject from './EditProject'
import SubmitList from './SubmitList'

export default class Project extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
      lists: [],
      showEditProject: false
    }

  }

  componentDidMount() {
    ListsAdapter.getLists(this.props.project.id)
    .then( newlists => {
        return newlists.filter((list) => {
          return list.project_id === this.props.project.id
        })
      })
    .then( data => {
        this.setState({
          lists: data
        })
    })
  }

  componentWillReceiveProps() {
    ListsAdapter.getLists(this.props.project.id)
    .then( newlists => {
        return newlists.filter((list) => {
          return list.project_id === this.props.project.id
        })
      })
    .then( data => {
        this.setState({
          lists: data
        })
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


  showEditProject = () => this.setState({showEditProject: !this.state.showEditProject})

  render() {
    return(
      <div className="project-component">
        { this.state.showEditProject ? <EditProject project={this.props.project.name} editProject={this.props.editProject} projectId = {this.props.project.id} showEditProject={this.showEditProject}/> : <div>{this.props.project.name}</div>}
        <button onClick={this.showEditProject}> <i className="fa fa-pencil"></i>
         </button>
        <SubmitList createList={this.createList} />
        {this.state.lists.map((list, i) => {
          return <List editList={this.editList} deleteList={this.deleteList} list={list} key={i}/>
        })}
      </div>
    )
  }
}
