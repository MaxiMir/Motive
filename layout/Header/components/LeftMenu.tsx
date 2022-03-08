import { useState, KeyboardEvent } from 'react'
import { signOut } from 'next-auth/react'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, List, Divider, ListItem, ListItemText, Button } from '@material-ui/core'
import useClient from 'hooks/useClient'
import AppIcon from 'components/UI/AppIcon'

export default function LeftMenu(): JSX.Element {
  const classes = useStyles()
  const client = useClient()
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen(!open)

  const onKeyDown = (event: KeyboardEvent) => {
    if (['Tab', 'Shift'].includes(event.key)) {
      return
    }

    toggle()
  }

  return (
    <div>
      <Button aria-label="open menu" onClick={toggle}>
        <AppIcon name="menu" className={classes.icon} />
      </Button>
      <Drawer open={open} onClose={toggle}>
        <div role="presentation" className={classes.list} onKeyDown={onKeyDown}>
          <List>
            {['News', 'How it works', 'Next Features', 'Support us'].map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          {client && (
            <>
              <Divider />
              <List>
                <ListItem button onClick={() => signOut()}>
                  <ListItemText primary="Sign out" />
                </ListItem>
              </List>
            </>
          )}
        </div>
      </Drawer>
    </div>
  )
}

const useStyles = makeStyles({
  list: {
    paddingTop: 60,
    minWidth: 200,
  },
  icon: {
    fontColor: '#ffffff',
  },
})
