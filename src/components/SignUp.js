import React from 'react'

export default class SignUp extends React.Component {

  constructor() {
    super()

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
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
    let newUser = {user: this.state}
    this.props.createUser(newUser)
  }

  render() {
    return(
      <div id="signup-component">
        <form onSubmit={this.handleSubmit} id="signup-form" className="user-form">
          <div className="form-header">
            <h5>Create Account</h5>
          </div>
          <div className="input-wrapper">
            <input type="text" onChange={this.handleChange} placeholder="First Name" name="firstname"/>
          </div>
          <div className="input-wrapper">
            <input type="text" onChange={this.handleChange} placeholder="Last Name" name="lastname"/>
          </div>
          <div className="input-wrapper">
            <input type="email" onChange={this.handleChange} placeholder="Email" name="email"/>
          </div>
          <div className="input-wrapper">
            <input type="text" onChange={this.handleChange} placeholder="Username" name="username"/>
          </div>
          <div className="input-wrapper">
            <input type="password" onChange={this.handleChange} placeholder="Password" name="password"/>
          </div>
          <div className="form-submit-btn-wrapper">
            <button type="submit" className="btn form-submit-btn">
              Create Account
            </button>
          </div>
        </form>
      </div>
    )
  }
}
