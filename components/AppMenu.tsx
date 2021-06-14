import React, { FC, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Drawer,
  List,
  Divider,
  ListItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { FavoritesIcon, MenuIcon } from './UI/icons'

export const AppMenu: FC = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (['Tab', 'Shift'].includes(event.key)) {
      return
    }

    setOpen(false)
  }

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div
          role="presentation"
          className={classes.list}
          onClick={() => setOpen(false)}
          onKeyDown={onKeyDown}
        >
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  <FavoritesIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  <FavoritesIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  )
}

const useStyles = makeStyles({
  list: {
    width: 250,
  },
})
