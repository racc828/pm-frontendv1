const path = 'http://localhost:3000/api/v1/lists'
export default class ListsAdapter {

  static createList(list, currentProject) {
    debugger
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
    return fetch(path, {
      headers: headers()
      })
      .then( resp => resp.json())
      .then( lists => {
         return lists.map(list => list)
    })
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
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
}
