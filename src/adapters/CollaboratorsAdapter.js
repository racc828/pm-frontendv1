const path = 'http://localhost:3000/api/v1/collaborators'
export default class CollaboratorsAdapter {

  static createCollaborator(collaborator, currentProject) {
    return fetch(path,{
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        collaborator_id: `${collaborator}`,
        project_id: `${currentProject}`
      })
    })
    .then( resp => resp.json())
  }

  static getCollaborators(currentProject) {
    return fetch(path, {
      method: 'GET',
      headers: headers()
      })
      .then( resp => resp.json())
    }

  }


let headers = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `${localStorage.getItem('token')}`
  }
}
