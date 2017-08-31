import React from 'react'

export default class Task extends React.Component {


  deleteTask = () => {
    this.props.deleteTask(this.props.task.id)
  }

  render() {
    return(
      <div className="task-component">
        <p>{this.props.task.title}</p>
        <p>{this.props.task.description}</p>
        <button onClick={this.deleteTask}>
          <i className="fa fa-trash-o"> </i>
        </button>
      </div>
    )
  }


}
