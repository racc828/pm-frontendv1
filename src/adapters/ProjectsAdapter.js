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
    }

    static editProject(project, currentUser) {
    return fetch(`http://localhost:3000/api/v1/projects/${project.projectId}`, {
      method: 'PATCH',
      headers:headers(),
      body: JSON.stringify({
        name: `${project.name}`,
        user_id: `${currentUser.id}`

      })
    })
    .then( resp => resp.json())
    }

    static deleteProject(projectId, currentUser) {
      return fetch(`http://localhost:3000/api/v1/projects/${projectId}`, {
        method: 'DELETE',
        headers: headers(),
        body: JSON.stringify({
          id: `${projectId}`
        })
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
    'Authorization': `${localStorage.getItem('token')}`
  }
}
