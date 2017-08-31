import React from 'react'
import ListsAdapter from '../adapters/ListsAdapter'
import List from './List'
import SubmitList from './SubmitList'

export default class Project extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
      lists: []
    }

  }

  componentDidMount() {
    ListsAdapter.getLists(this.props.project.id)
    .then( newlists => {
        return newlists.filter((list) => {
          return list.project_id === this.props.project.id
        })
      })
    .then( data => {
        this.setState({
          lists: data
        })
    })
  }

  componentWillReceiveProps() {
    ListsAdapter.getLists(this.props.project.id)
    .then( newlists => {
        return newlists.filter((list) => {
          return list.project_id === this.props.project.id
        })
      })
    .then( data => {
        this.setState({
          lists: data
        })
    })
  }

  createList = (newList) => {
    ListsAdapter.createList(newList, this.props.project.id)
    .then(data => this.setState({
        lists: [...this.state.lists, data]
      }))
  }


  render() {
    return(
      <div className="project-component">
        <SubmitList createList={this.createList} />
        <div>{this.props.project.name}</div>
        {this.state.lists.map((list, i) => {
          return <List list={list} key={i}/>
        })}
      </div>
    )
  }
}
