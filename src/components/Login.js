import React from 'react'
import SignUp from './SignUp'
import { Link } from "react-router-dom";


export default class Login extends React.Component {
  constructor() {
    super()

    this.state = {
      username: "",
      password: ""
    }

  }

  handleChange = (e) => {
    let property = e.target.name
    let value = e.target.value
    this.setState({
      [property]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let user = this.state
    this.props.getUser(user)
    this.props.resetError()
  }

  render(){
    return(
      <div id="login-component">
        <form onSubmit={this.handleSubmit} id="login-form" className="user-form">
          <div className="form-header">
            <h5>Login</h5>
          </div>
          <div className="input-wrapper">
            <input type="text" onChange={this.handleChange} placeholder="username" name="username"/>
          </div>
          <div className="input-wrapper">
            <input type="password" onChange={this.handleChange} placeholder="password" name="password"/>
          </div>
          <div className="form-submit-btn-wrapper">
            <button type="submit" className="btn form-submit-btn">
              Login
            </button>
          </div>
        </form>
        <Link to="/signup">Create Account</Link>
      </div>
    )
  }




}
