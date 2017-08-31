const path = 'http://localhost:3000/api/v1/projects'
export default class ProjectsAdapter {

  static createProject(project, currentUser) {
    return fetch(path,{
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        name: `${project.name}`,
        user_id: `${currentUser.id}`
      })
    })
    .then( resp => resp.json())
  }

  static getProjects(currentUser) {
    return fetch(path, {
      headers: headers()
      })
      .then( resp => resp.json())
      .then( projects => {
         return projects.filter((project) => parseInt(project.user_id) === currentUser.id)
      })
    }

  }


let headers = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
}
