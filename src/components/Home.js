import React from 'react'
import SessionsAdapter from '../adapters/SessionsAdapter'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      currentUser: {}
    }
  }

  componentDidMount(){
    SessionsAdapter.currentUser()
      .then( data => {
        this.setState({
          currentUser: data
        })
      })
     }

  render() {
    return(
      <div id="home-wrapper">
        Welcome {this.state.currentUser.username}
        <div className="btn logout-btn-wrapper">
          <button className="logout-btn" onClick={this.props.logOut}>
            Logout
          </button>
        </div>
      </div>
    )
  }

}
