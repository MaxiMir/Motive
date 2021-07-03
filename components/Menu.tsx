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

  return (
    <div>
      <IconButton edge="start" color="inherit" aria-label="open menu" onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div role="presentation" className={classes.list} onKeyDown={onKeyDown} onClick={() => setOpen(false)}>
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
