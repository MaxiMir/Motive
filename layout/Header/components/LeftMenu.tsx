import { useState, KeyboardEvent } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, List, Divider, ListItem, ListItemText, Button } from '@material-ui/core'
import AppIcon from 'components/UI/AppIcon'

export default function LeftMenu(): JSX.Element {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const { status } = useSession()

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
        <div role="presentation" className={classes.list} onKeyDown={onKeyDown} onClick={toggle}>
          <List>
            {['News', 'How it works', 'Next Features', 'Support us'].map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          {status === 'authenticated' && (
            <>
              <Divider />
              <List>
                <ListItem button>
                  <ListItemText primary="Sign out" onClick={() => signOut()} />
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
    width: 200,
  },
  icon: {
    fontColor: '#ffffff',
  },
})
