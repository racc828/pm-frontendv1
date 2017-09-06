import React from 'react'

export default class Collaborator extends React.Component {

  constructor() {
    super()
  }

  render() {
    return(
      <div className="collaborator-circle-container">
        <div className="collaborator-circle">
          <i className="fa fa-user"></i>
          <div className="user-name">

          </div>
          <div className="hidden"></div>
        </div>
      </div>
    )
  }
}
