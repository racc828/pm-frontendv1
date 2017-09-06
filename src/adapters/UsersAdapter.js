const path = 'http://localhost:3000/api/v1/users'

export default class UsersAdapter {

  static createUser(user) {
    return fetch(path, {
      method: 'post',
      headers: headers(),
      body: JSON.stringify(user)
    })
    .then( resp => resp.json())
    localStorage.setItem('token', user.jwt)
  }

  static getUsers(currentUser) {
    return fetch(path, {
      method: 'get',
      headers: headers()
    })
    .then( resp => resp.json())
  }

}

let headers = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}
