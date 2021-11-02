import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, List, Divider, ListItem, IconButton, ListItemText } from '@material-ui/core'
import { MenuIcon } from './UI/icons'

export default function Menu(): JSX.Element {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (['Tab', 'Shift'].includes(event.key)) {
      return
    }

    setOpen(false)
  }

  const onOpen = () => setOpen(true)

  const onClose = () => setOpen(false)

  return (
    <div>
      <IconButton edge="start" color="inherit" aria-label="open menu" onClick={onOpen}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={onClose}>
        <div role="presentation" className={classes.list} onKeyDown={onKeyDown} onClick={onClose}>
          <List>
            {['News', 'How it works', 'Next Features', 'Support us'].map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Exit'].map((text) => (
              <ListItem button key={text}>
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
    width: 200,
  },
})
