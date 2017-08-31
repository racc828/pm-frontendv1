import React from 'react'

export default class Task extends React.Component {


  render() {
    return(
      <div className="task-component">
        <p>{this.props.task.title}</p>
        <p>{this.props.task.description}</p>
      </div>
    )
  }


}
