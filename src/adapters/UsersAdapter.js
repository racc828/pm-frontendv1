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

}

let headers = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}
