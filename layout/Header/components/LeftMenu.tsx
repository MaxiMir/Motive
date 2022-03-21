import { useState, KeyboardEvent, useContext } from 'react'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, List, Divider, ListItem, ListItemText, Button, ListItemIcon } from '@material-ui/core'
import useClient from 'hooks/useClient'
import useDebounceCb from 'hooks/useDebounceCb'
import { ThemeContext } from 'context/themeContext'
import AppIcon from 'components/UI/AppIcon'
import AppBox from 'components/UI/AppBox'

const MENU = [
  { name: 'News', icon: 'newspaper', link: '' },
  { name: 'Next Features', icon: 'dynamic_form', link: '' },
  { name: 'Contact us', icon: 'all_inbox', link: 'contact' },
]

export default function LeftMenu(): JSX.Element {
  const classes = useStyles()
  const client = useClient()
  const router = useRouter()
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
          <AppBox flexDirection="column" justifyContent="space-between" height="100%">
            <div>
              <List>
                {MENU.map(({ name, icon, link }) => (
                  <ListItem button disabled={!link} onClick={() => router.push(link)} key={name}>
                    <ListItemText primary={name} />
                    <ListItemIcon>
                      <AppIcon name={icon} />
                    </ListItemIcon>
                  </ListItem>
                ))}
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
            <ListItem button disabled onClick={toggleWithDebounce}>
              <ListItemText primary={`Dark theme: ${isLight ? 'Off' : 'On'}`} />
              <ListItemIcon>
                <AppIcon name={isLight ? 'light_mode' : 'dark_mode'} />
              </ListItemIcon>
            </ListItem>
          </AppBox>
        </div>
      </Drawer>
    </div>
  )
}

const useStyles = makeStyles({
  list: {
    height: '100%',
    padding: '60px 0 8px',
    minWidth: 220,
  },
})
