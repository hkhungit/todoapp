import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import Subheader from 'material-ui/Subheader'
import ListStore from '../stores/List'
import Dialog from 'material-ui/Dialog'

@observer
class CategoryForm extends Component {
  @observable title = ''
  @observable open = false
  @observable isSubmiting = false
  @observable error = {}

  addCategory() {
    this.isSubmiting = true
    this.error = {}
    if (!this.title) {
      this.error.title = "Title can't be blank"
    }

    if (Object.keys(this.error).length > 0) {
      this.isSubmiting = false
      this.error = {...this.error}
      return null
    }

    const category = { title: this.title }
    ListStore.addCategory(category)
    this.reset()
  }

  reset() {
    this.title = ''
    this.open = false
    this.error = {}
    this.isSubmiting = false
  }

  render() {
    return (
      <Dialog contentStyle={{padding: 30, maxWidth: 400}} open={this.open}>
        <Subheader style={{textAlign: 'center'}}> ADD CATEGORY </Subheader>
        <TextField
          value={this.title}
          errorText={this.error.title}
          hintText="Category title *"
          onChange={e => {this.title = e.target.value}}
        /><br />
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <RaisedButton
            label="Add"
            disabled={this.isSubmiting}
            primary={true}
            onTouchTap={this.addCategory.bind(this)}/>
          <RaisedButton
            label="Cancel"
            disabled={this.isSubmiting}
            secondary={true}
            onTouchTap={this.reset.bind(this)}/>
        </div>
      </Dialog>
    )
  }
}

export default CategoryForm