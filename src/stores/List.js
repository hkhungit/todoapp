import { observable, computed } from 'mobx'

class List {
  @observable categories = {
    'category-1': 'Label 1',
    'category-2': 'Label 2',
    'category-3': 'Label 3',
    'category-4': 'Label 4',
  }

  @observable todos = {
    'todo-1': {
      completed: true,
      title: 'Title todo 1',
      description: 'Description todo 1',
      created_at: Date.now()
    },
    'todo-2': {
      completed: false,
      title: 'Title todo 2',
      description: 'Description todo 2',
      category: 'category-1',
      created_at: Date.now()
    }
  }

  @computed get Completed() {
    return Object.keys(this.todos)
                .filter(key => this.todos[key].completed === true)
                .reduce((obj, key) => {
                  obj[key] = this.todos[key]
                  return obj
                }, {})
  }

  @computed get Uncompleted() {
    return Object.keys(this.todos)
                .filter(key => this.todos[key].completed === false)
                .reduce((obj, key) => {
                  obj[key] = this.todos[key]
                  return obj
                }, {})
  }

  add(todo) {
    const created_at = Date.now()
    todo = {...todo, created_at}
    this.todos = {
      ...this.todos,
      [created_at]: todo
    }
  }

  delete(key) {
    delete this.todos[key]
    this.todos = {...this.todos}
  }
}

export default new List()