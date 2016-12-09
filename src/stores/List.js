import { observable, computed } from 'mobx'
import {database} from '../db/firebase'

class List {
  @observable categories = {}
  @observable todos = {}

  constructor() {
    database.ref('todos').on('value', (snapshot) => {
      this.todos = snapshot.val() || {}
    })

    database.ref('categories').on('value', (snapshot) => {
      this.categories = snapshot.val() || {}
    })
  }

  @computed get Completed() {
    if (Object.keys(this.todos).length < 1) return {}
    return Object.keys(this.todos)
                .filter(key => this.todos[key].completed === true)
                .reduce((obj, key) => {
                  obj[key] = this.todos[key]
                  return obj
                }, {})
  }

  @computed get Uncompleted() {
    if (Object.keys(this.todos).length < 1) return {}
    return Object.keys(this.todos)
                .filter(key => this.todos[key].completed === false)
                .reduce((obj, key) => {
                  obj[key] = this.todos[key]
                  return obj
                }, {})
  }

  toggle(key, value) {
    this.todos = {...this.todos}
    return database.ref(`todos/${key}`).update({completed: value})
  }

  add(todo) {
    const created_at = Date.now()
    todo = {...todo, created_at}
    
    return database.ref('todos').push(todo)
  }

  delete(key) {
    delete this.todos[key]
    this.todos = {...this.todos}
    return database.ref(`todos/${key}`).remove()
  }


  addCategory(category) {
    const created_at = Date.now()
    category = {...category, created_at}
    return database.ref('categories').push(category)
  }
}

export default new List()