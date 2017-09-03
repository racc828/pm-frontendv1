import React from 'react'
import SubmitTask from './SubmitTask'
import Task from './Task'
import EditList from './EditList'
import TasksAdapter from '../adapters/TasksAdapter'


export default class List extends React.Component {

  constructor() {
    super()

    this.state = {
      tasks: [],
      showEditList: false,
      positionX: null,
      positionY: null
    }
  }

  componentDidMount() {
    TasksAdapter.getTasks(this.props.list.id)
    .then( tasks => {
        return tasks.filter((task) => {
          return task.list_id === this.props.list.id
        })
      })
    .then( task => {
        this.setState({
          tasks: task
        })
    })
  }

  componentWillReceiveProps() {
    TasksAdapter.getTasks(this.props.list.id)
    .then( tasks => {
        return tasks.filter((task) => {
          return task.list_id === this.props.list.id
        })
      })
    .then( task => {
        this.setState({
          tasks: task
        })
    })
  }

  editList = (list) => {
    this.props.editList(list)
    this.setState({showEditList:false})
  }

  deleteList = () => {
    this.props.deleteList(this.props.list.id)
  }

  createTask = (newTask) => {
    TasksAdapter.createTask(newTask, this.props.list.id)
    .then( task => {
        this.setState({
          tasks: [...this.state.tasks, task]
        })
    })
  }

  deleteTask = (task) => {
    TasksAdapter.deleteTask(task, this.props.list.id)
    .then( tasks => {
        this.setState({
          tasks: tasks
        })
    })
  }

  showEditList = () => this.setState({showEditList: !this.state.showEditList})

  // handleStop = (e, ui) => {
  //   this.setState({
  //     positionX: ui.lastX,
  //     positionY: ui.lastY
  //   })
  // }

  render() {
    return(
      <div className="list-component">
        { this.state.showEditList ? <EditList name={this.props.list.name} listId={this.props.list.id} editList={this.editList}/> : <h6 className="list-title">{this.props.list.name}</h6>}
        <button className="float-right add-task-btn"><i className="fa fa-plus"></i></button>
        <button onClick={this.deleteList}>
          <i className="fa fa-trash-o"> </i>
        </button>
        <button onClick={this.showEditList}>
          <i className="fa fa-pencil"> </i>
        </button>
        <SubmitTask createTask={this.createTask}/>
        {this.state.tasks.map((task, i) => {
          return <Task task={task} key={i} deleteTask={this.deleteTask}/>
        })}
      </div>
    )
  }

}
