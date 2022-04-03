import dynamic from 'next/dynamic'
import { AppBar, Chip, createStyles, makeStyles } from '@material-ui/core'
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
    <AppBar position="sticky" className={classes.root}>
      <AppContainer>
        <AppBox justifyContent="space-between" alignItems="center">
          <LeftMenu />
          <Chip label="Beta 1.0.2" variant="outlined" />
          {authenticated ? <Notification /> : <SignIn />}
        </AppBox>
      </AppContainer>
    </AppBar>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: '16px 0 8px',
      flexGrow: 1,
      backgroundColor: theme.block.menu,
      boxShadow: 'none',
    },
  }),
)
