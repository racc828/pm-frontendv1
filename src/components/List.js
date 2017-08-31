import React from 'react'
import SubmitTask from './SubmitTask'

export default class List extends React.Component {

  render() {
    return(
      <div className="list-component">
        <h6 className="list-title">{this.props.list.name}</h6>
        <button className="float-right add-task-btn"><i className="fa fa-plus"></i></button>
        <SubmitTask/>
      </div>
    )
  }

}
