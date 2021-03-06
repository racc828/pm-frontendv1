const path = 'http://localhost:3000/api/v1/tasks'
export default class TasksAdapter {

  static createTask(newTask, listId) {
    return fetch(path,{
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        list_id: `${listId}`,
        title: `${newTask.title}`,
        description: `${newTask.description}`,
        completed: `${newTask.completed}`
      })
    })
    .then( resp => resp.json())
  }

  static getTasks(listId) {
    return fetch(path, {
      headers: headers()
    })
      .then( resp => resp.json())
      .then( tasks => {
        return tasks
      })
    }

    static editTask(task, listId) {
      return fetch(`http://localhost:3000/api/v1/tasks/${task.id}`, {
        method: 'PATCH',
        headers:headers(),
        body: JSON.stringify({
          title: `${task.title}`,
          description: `${task.description}`,
          list_id: `${listId}`
        })
      })
      .then( resp => resp.json())
    }

    static deleteTask(task, listId) {
      return fetch(`http://localhost:3000/api/v1/tasks/${task}`, {
        method: 'DELETE',
        headers: headers(),
        body: JSON.stringify({
          list_id: `${listId}`,
        })
      })
      .then( resp => resp.json())
      .then( tasks => {
        return tasks.filter((task) => task.list_id === listId)
      })
    }

  }

  let headers = () => {
    const token = localStorage.getItem('token')
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  }
