import { useState, KeyboardEvent, useContext } from 'react'
import { signOut } from 'next-auth/react'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, List, Divider, ListItem, ListItemText, Button, ListItemIcon } from '@material-ui/core'
import useClient from 'hooks/useClient'
import useDebounceCb from 'hooks/useDebounceCb'
import { ThemeContext } from 'context/themeContext'
import AppIcon from 'components/UI/AppIcon'

const MENU = [
  { name: 'News', icon: 'newspaper' },
  { name: 'Next Features', icon: 'dynamic_form' },
  { name: 'Support us', icon: 'payments' },
]

export default function LeftMenu(): JSX.Element {
  const classes = useStyles()
  const client = useClient()
  const { type, toggle } = useContext(ThemeContext)
  const [open, setOpen] = useState(false)
  const isLight = type === 'light'
  const toggleWithDebounce = useDebounceCb(toggle)

  const toggleModal = () => setOpen(!open)

  const onKeyDown = (event: KeyboardEvent) => {
    if (['Tab', 'Shift'].includes(event.key)) return

    toggleModal()
  }

  const onSignOut = () => signOut()

  return (
    <div>
      <Button aria-label="open menu" onClick={toggleModal}>
        <AppIcon name="menu" />
      </Button>
      <Drawer open={open} onClose={toggleModal}>
        <div role="presentation" className={classes.list} onKeyDown={onKeyDown}>
          <List>
            {MENU.map(({ name, icon }) => (
              <ListItem button disabled key={name}>
                <ListItemText primary={name} />
                <ListItemIcon>
                  <AppIcon name={icon} />
                </ListItemIcon>
              </ListItem>
            ))}
            <ListItem button disabled onClick={toggleWithDebounce}>
              <ListItemText primary={`Dark theme: ${isLight ? 'Off' : 'On'}`} />
              <ListItemIcon>
                <AppIcon name={isLight ? 'light_mode' : 'dark_mode'} />
              </ListItemIcon>
            </ListItem>
          </List>
          {client && (
            <>
              <Divider />
              <List>
                <ListItem button onClick={onSignOut}>
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
    minWidth: 220,
  },
})
