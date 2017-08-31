import React from 'react'

export default class Project extends React.Component {
  constructor() {
    super()
  }

  render() {
    return(
      <div>
        {this.props.project.name}
      </div>
    )
  }
}
