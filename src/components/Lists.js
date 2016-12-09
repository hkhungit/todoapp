import React, { Component } from 'react'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import { observer } from 'mobx-react'
import ListStore from '../stores/List'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Chip from 'material-ui/Chip'

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="Action"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color="red" />
  </IconButton>
)

@observer
class Lists extends Component {
  toggle(key, value) {
    ListStore.toggle(key, value)
  }

  render() {
    const { completed = false } = this.props
    const subTitle = completed ? 'Completed' : 'Uncompleted'
    const todos = ListStore[subTitle]

    return (
      <List style={{flex: 1, margin: 10}}>
        <Subheader>{subTitle}</Subheader>
        <Divider />
        {
          Object.keys(todos).map(key => {
            const cate = todos[key].category
            const category = cate ? <Chip key={cate} style={{margin: 2}}>{(ListStore.categories[cate] || {}).title}</Chip> : null

            return [
              <ListItem
                key={key}
                primaryText={todos[key].title}
                secondaryText={
                  <div style={{height: 'initial'}}>
                    <div style={{display: 'flex'}}>{category}</div>
                    <div style={{marginTop: 20}}>
                      {todos[key].description}
                    </div>
                  </div>
                }
                secondaryTextLines={2}
                rightIconButton={
                  <IconMenu iconButtonElement={iconButtonElement}>
                    <MenuItem onTouchTap={() => this.toggle(key, !completed)}>{!completed ? 'Completed' : 'Uncompleted'}</MenuItem>
                    <MenuItem onTouchTap={() => ListStore.delete(key)}>Delete</MenuItem>
                  </IconMenu>
                }
              />,
              <Divider />
            ]
          })
        }
      </List>
    )
  }
}

export default Lists