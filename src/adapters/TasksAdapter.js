const path = 'http://localhost:3000/api/v1/tasks'
export default class TasksAdapter {

  static createTask(newTask, listId) {
    debugger
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

    // static editTask(taskData, taskId) {
    //   debugger
    //   return fetch(`http://localhost:3000/api/v1/tasks/${taskId}`, {
    //     method: 'PATCH',
    //     headers:headers(),
    //     body: JSON.stringify({
    //       name: `${taskData.name}`,
    //       description: `${taskData.description}`,
    //       priority: `${taskData.priority}`,
    //       list_id: `${taskData.list_id}`
    //     })
    //   })
    //   .then( resp => resp.json())
    // }

    // static deleteTask(name, description, id, priority, listId) {
    //   return fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
    //     method: 'DELETE',
    //     headers: headers(),
    //     body: JSON.stringify({
    //       name: `${name}`,
    //       id: `${id}`,
    //       description: `${description}`,
    //       priority: `${priority}`
    //     })
    //   })
    //   .then( resp => resp.json())
    //   .then( tasks => {
    //     return tasks.filter((t) => t.list_id === listId)
    //   })
    // }

  }

  let headers = () => {
    const token = localStorage.getItem('token')
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  }
