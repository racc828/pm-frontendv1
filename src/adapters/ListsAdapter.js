const path = 'http://localhost:3000/api/v1/lists'
export default class ListsAdapter {

  static createList(list, currentProject) {
    return fetch(path,{
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        name: `${list.name}`,
        project_id: `${currentProject}`
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
}


let headers = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
}
