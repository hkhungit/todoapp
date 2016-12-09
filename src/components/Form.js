import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import Subheader from 'material-ui/Subheader'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import ListStore from '../stores/List'

@observer
class Form extends Component {
  @observable title = ''
  @observable completed = false
  @observable description = ''
  @observable category = null
  @observable isSubmiting = false
  @observable error = {}

  add() {
    this.isSubmiting = true
    this.error = {}
    if (!this.title) {
      this.error.title = "Title can't be blank"
    }
    if (!this.category) {
      this.error.category = "Category can't be blank"
    }

    if (Object.keys(this.error).length > 0) {
      this.isSubmiting = false
      this.error = {...this.error}
      return null
    }

    const todo = {
      title: this.title,
      category: this.category,
      completed: this.completed,
      description: this.description
    }
    ListStore.add(todo)
    this.reset()
  }

  reset() {
    this.title = ''
    this.completed = false
    this.description = ''
    this.category = null
    this.error = {}
    this.isSubmiting = false
  }

  render() {
    return (
      <Paper style={{padding: 30}}>
        <Subheader style={{textAlign: 'center'}}> ADD TODO </Subheader>
        <TextField
          value={this.title}
          errorText={this.error.title}
          hintText="Todo title *"
          onChange={e => {this.title = e.target.value}}
        /><br />
        <TextField
          rows={2}
          multiLine={true}
          value={this.description}
          hintText="Todo description"
          onChange={e => {this.description = e.target.value}}
        /><br />
        <SelectField
          value={this.category}
          floatingLabelText="Category *"
          errorText={this.error.category}
          onChange={(_, index, value) => this.category = value}
        >
          {Object.keys(ListStore.categories).map(key => 
            <MenuItem key={key} value={key} primaryText={ListStore.categories[key]} />
          )}
        </SelectField>
        <div style={{display: 'flex'}}>
          <Checkbox checked={this.completed} style={{width: 40}} onTouchTap={(e, value) => this.completed = !e.target.checked}/> Completed
        </div> <br />
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <RaisedButton
            label="Add"
            disabled={this.isSubmiting}
            primary={true}
            onTouchTap={this.add.bind(this)}/>
          <RaisedButton
            label="Cancel"
            disabled={this.isSubmiting}
            secondary={true}
            onTouchTap={this.reset.bind(this)}/>
        </div>
      </Paper>
    )
  }
}

export default Form