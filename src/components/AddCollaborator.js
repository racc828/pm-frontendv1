import React from 'react'

export default class AddCollaborator extends React.Component {

  render(){
    return(
      <option value={this.props.collaborator.id}>
        {this.props.collaborator.firstname}
      </option>
    )
  }
}
