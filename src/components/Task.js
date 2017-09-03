import React from 'react'
import EditTask from './EditTask'


export default class Task extends React.Component {

  constructor() {
    super()

    this.state = {
      positionX: null,
      positionY: null,
      showEditTask: false
    }
  }

  deleteTask = () => {
    this.props.deleteTask(this.props.task.id)
  }

  handleStop = (e, ui) => {
    this.setState({
      positionX: ui.lastX,
      positionY: ui.lastY
    })
  }

  showEditTask = () => this.setState({showEditTask: !this.state.showEditTask})

  render() {
    return(
        <div className="task-component">
          { this.state.showEditTask ? <EditTask showEditTask={this.showEditTask} title={this.props.task.title} description={this.props.task.description} id={this.props.task.id} editTask={this.props.editTask} /> : <div><p>{this.props.task.title}</p>
          <p>{this.props.task.description}</p></div>}

          <button onClick={this.deleteTask}>
            <i className="fa fa-trash-o"> </i>
          </button>
          <button onClick={this.showEditTask}>
            <i className="fa fa-pencil"> </i>
          </button>
        </div>
    )
  }


}
