const path = 'http://localhost:3000/api/v1/lists'
export default class ListsAdapter {

  static createList(list, currentProject) {
    return fetch(path,{
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        name: `${list.name}`,
        project_id: `${currentProject}`,
        positionX: `${list.positionX}`,
        positionY: `${list.positionY}`
      })
    })
    .then( resp => resp.json())
  }

  static getLists(currentProject) {
    console.log(currentProject)
    let path = `http://localhost:3000/api/v1/projects/${currentProject}`
    return fetch(path, {
      headers: headers(),
      })
      .then( resp => resp.json())
  }


  static editList(list, projectId) {
    return fetch(`http://localhost:3000/api/v1/lists/${list.id}`, {
      method: 'PATCH',
      headers:headers(),
      body: JSON.stringify({
        name: `${list.name}`,
        project_id: `${projectId}`
      })
    })
    .then( resp => resp.json())
  }

  static editListCoordinates(positionX, positionY, listId, projectId) {
    return fetch(`http://localhost:3000/api/v1/lists/${listId}`, {
      method: 'PATCH',
      headers:headers(),
      body: JSON.stringify({
        project_id: `${projectId}`,
        positionX: `${positionX}`,
        positionY: `${positionY}`
      })
    })
    .then( resp => resp.json())
  }


  static deleteList(listId, currentProject) {
    return fetch(`http://localhost:3000/api/v1/lists/${listId}`, {
      method: 'DELETE',
      headers: headers(),
      body: JSON.stringify({
        project_id: `${currentProject}`
      })
    })
    .then( resp => resp.json())
    .then( lists => {
      return lists.filter((list) => list.project_id == currentProject)
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
