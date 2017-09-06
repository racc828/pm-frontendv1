import React from 'react'
import SubmitTask from './SubmitTask'
import Task from './Task'
import EditList from './EditList'
import TasksAdapter from '../adapters/TasksAdapter'
import ListsAdapter from '../adapters/ListsAdapter'
import Draggable from 'react-draggable'



export default class List extends React.Component {

  constructor() {
    super()
    this.state = {
      tasks: [],
      showEditList: false,
      showAddTask: false,
      editingDropdown: false,
      positionX: null,
      positionY: null
    }
  }

  componentDidMount() {
    TasksAdapter.getTasks(this.props.list.id)
    .then( tasks => {
        return tasks.filter((task) => {
          return task.list_id === this.props.list.id
        })
      })
    .then( task => {
        this.setState({
          tasks: task
        })
    })
  }

  componentWillReceiveProps() {
    TasksAdapter.getTasks(this.props.list.id)
    .then( tasks => {
        return tasks.filter((task) => {
          return task.list_id === this.props.list.id
        })
      })
    .then( task => {
        this.setState({
          tasks: task
        })
    })
  }

  editList = (list) => {
    this.props.editList(list)
    this.setState({showEditList:false})
  }

  deleteList = () => {
    this.props.deleteList(this.props.list.id)
    this.setState({
      editingDropdown: !this.state.editingDropdown
    })
  }

  createTask = (newTask) => {
    TasksAdapter.createTask(newTask, this.props.list.id)
    .then( task => {
        this.setState({
          tasks: [...this.state.tasks, task]
        })
    })
  }

  editTask = (task) => {
    TasksAdapter.editTask(task, this.props.list.id)
    .then(task => {
        let index = this.state.tasks.findIndex(stateTask=> stateTask.id === task.id)
        this.setState({
          tasks: [
           ...this.state.tasks.slice(0,index),
           Object.assign({}, this.state.tasks[index], task),
           ...this.state.tasks.slice(index+1)
         ]
        })
      })
  }

  deleteTask = (task) => {
    TasksAdapter.deleteTask(task, this.props.list.id)
    .then( tasks => {
        this.setState({
          tasks: tasks
        })
    })
  }

  showEditList = () => this.setState({showEditList: !this.state.showEditList, editingDropdown: !this.state.editingDropdown})

  showAddTask = () => this.setState({showAddTask: !this.state.showAddTask})

  editingDropdown = () => this.setState({editingDropdown: !this.state.editingDropdown})

  handleStop = (e, ui) => {
    if (ui.deltaX !== 0) {
      ListsAdapter.editListCoordinates(ui.lastX, ui.lastY, this.props.list.id, this.props.projectId )
    }
  }

  render() {
    return(
    <Draggable
          axis="x"
          grid={[260, 260]}
          onStop={this.handleStop}
          defaultPosition={{x: this.props.list.positionX, y: this.props.list.positionY,}}
          preventCollision={true}
          >
        <div className="list-component">
          <div className="editing-list-btns">
            <div className="dropdown-btn-container">
              <h3 className="list-title">{this.props.list.name} <i className="fa fa-chevron-down right-chevron" onClick={this.editingDropdown}></i></h3>
            </div>
            <div>{this.state.showEditList ?
              <div><EditList showEditList={this.showEditList} name={this.props.list.name} listId={this.props.list.id} editList={this.editList}/></div> : null}</div>
              <div>{this.state.editingDropdown ?
              <div className="dropdown-button-btn-container"><button className="dropdown-button-btn" onClick={this.deleteList}>
                <div> Delete List </div>
              </button>
              <button className="dropdown-button-btn" onClick={this.showEditList}>
                <div> Edit List </div>
              </button></div> : null}</div>
          </div>
          <div className="add-task-btn-container">
            <button onClick={this.showAddTask} className="add-task-btn"><i className="fa fa-plus"></i></button>
          </div>
          {this.state.showAddTask ? <SubmitTask createTask={this.createTask}/> : null}
          {this.state.tasks.map((task, i) => {
            return <Task task={task} key={i} editTask={this.editTask} deleteTask={this.deleteTask}/>
          })}
        </div>
      </Draggable>
    )
  }

}
