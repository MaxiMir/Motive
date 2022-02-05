import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Button } from '@material-ui/core'
import { LOGIN_IN_ROUTE } from 'route'
import AppContainer from 'components/UI/AppContainer'
import AppBox from 'components/UI/AppBox'
import AppIcon from 'components/UI/AppIcon'
import LeftMenu from './components/LeftMenu'

const Badge = dynamic(() => import('@material-ui/core/Badge'))

interface HeaderProps {
  isAuthenticated: boolean
}

export default function Header({ isAuthenticated }: HeaderProps): JSX.Element {
  const classes = useStyles()

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <AppContainer>
        <AppBox justifyContent="space-between">
          <LeftMenu />
          {!isAuthenticated ? (
            <Button href={LOGIN_IN_ROUTE}>
              <AppIcon name="login" />
            </Button>
          ) : (
            <Button href={LOGIN_IN_ROUTE}>
              <Badge color="error" badgeContent="" variant="dot" invisible={false}>
                <AppIcon name="notifications_none" />
              </Badge>
            </Button>
          )}
        </AppBox>
      </AppContainer>
    </AppBar>
  )
}

const useStyles = makeStyles({
  appBar: {
    padding: '16px 0 8px',
    flexGrow: 1,
    backgroundColor: '#121212',
    boxShadow: 'none',
  },
})
