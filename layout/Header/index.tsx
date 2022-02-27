import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar } from '@material-ui/core'
import AppContainer from 'components/UI/AppContainer'
import AppBox from 'components/UI/AppBox'
import LeftMenu from './components/LeftMenu'

const SignIn = dynamic(() => import('./components/SignIn'))
const Notification = dynamic(() => import('./components/Notification'))

interface HeaderProps {
  authenticated: boolean
}

export default function Header({ authenticated }: HeaderProps): JSX.Element {
  const classes = useStyles()

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <AppContainer>
        <AppBox justifyContent="space-between">
          <LeftMenu />
          {authenticated ? <Notification /> : <SignIn />}
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
