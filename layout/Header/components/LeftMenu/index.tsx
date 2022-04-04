import { useState, KeyboardEvent, useContext } from 'react'
import { signOut } from 'next-auth/react'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, List, Divider, ListItem, Button, ListItemText, ListItemIcon } from '@material-ui/core'
import useLocale from 'hooks/useLocale'
import useClient from 'hooks/useClient'
import useDebounceCb from 'hooks/useDebounceCb'
import { ThemeContext } from 'context/themeContext'
import AppIcon from 'components/UI/AppIcon'
import AppBox from 'components/UI/AppBox'
import { MENU } from './helper'
import i18n from './i18n'

export default function LeftMenu(): JSX.Element {
  const classes = useStyles()
  const { locale, jump, next } = useLocale()
  const client = useClient()
  const { type, toggle } = useContext(ThemeContext)
  const [open, setOpen] = useState(false)
  const isLight = type === 'light'
  const i18nElements = i18n[locale]
  const { ariaLabel, language, logOut, getTheme } = i18nElements
  const themePrimary = getTheme(isLight)
  const changeThemeDebounce = useDebounceCb(toggle)
  const toggleModal = () => setOpen(!open)

  const onKeyDown = (event: KeyboardEvent) => {
    if (['Tab', 'Shift'].includes(event.key)) return

    toggleModal()
  }

  const onSignOut = () => signOut()

  return (
    <div>
      <Button aria-label={ariaLabel} onClick={toggleModal}>
        <AppIcon name="menu" />
      </Button>
      <Drawer open={open} onClose={toggleModal}>
        <div role="presentation" className={classes.list} onKeyDown={onKeyDown}>
          <AppBox flexDirection="column" justifyContent="space-between" height="100%">
            <div>
              <List>
                {MENU.map(({ id, icon, link }) => (
                  <ListItem button disabled={!link} onClick={() => jump(link)} key={id}>
                    <ListItemText primary={i18nElements[id]} />
                    <ListItemIcon>
                      <AppIcon name={icon} />
                    </ListItemIcon>
                  </ListItem>
                ))}
              </List>
              {client && (
                <>
                  <Divider light />
                  <List>
                    <ListItem button onClick={onSignOut}>
                      <ListItemText primary={logOut} />
                    </ListItem>
                  </List>
                </>
              )}
            </div>
            <div>
              <ListItem button onClick={next}>
                <ListItemText primary={language} />
                <ListItemIcon>
                  <AppIcon name="language" />
                </ListItemIcon>
              </ListItem>
              <ListItem button disabled onClick={changeThemeDebounce}>
                <ListItemText primary={themePrimary} className={classes.theme} />
                <ListItemIcon>
                  <AppIcon name={isLight ? 'light_mode' : 'dark_mode'} />
                </ListItemIcon>
              </ListItem>
            </div>
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
  theme: {
    width: 150,
  },
})
