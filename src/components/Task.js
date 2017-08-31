import React from 'react'

export default class Task extends React.Component {


  render() {
    return(
      <div className="task-component">
        {this.props.task.title}
      </div>
    )
  }


}
