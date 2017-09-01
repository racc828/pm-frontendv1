import React from 'react'
import SubmitTask from './SubmitTask'
import Task from './Task'
import TasksAdapter from '../adapters/TasksAdapter'
import Draggable from 'react-draggable'; // The default


export default class List extends React.Component {

  constructor() {
    super()

    this.state = {
      tasks: [],
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

  handleStop = (e, ui) => {
    this.setState({
      positionX: ui.lastX,
      positionY: ui.lastY
    })
  }

  render() {
    return(
      <Draggable
        onStop={this.handleStop}
        grid={[200, 200]}
        axis="x">
      <div className="list-component">
        <h6 className="list-title">{this.props.list.name}</h6>
        <button className="float-right add-task-btn"><i className="fa fa-plus"></i></button>
        <button onClick={this.deleteList}>
          <i className="fa fa-trash-o"> </i>
        </button>
        <SubmitTask createTask={this.createTask}/>
        {this.state.tasks.map((task, i) => {
          return <Task task={task} key={i} deleteTask={this.deleteTask}/>
        })}
      </div>
    </Draggable>
    )
  }

}
