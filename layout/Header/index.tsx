import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar } from '@material-ui/core'
import { LOGIN_IN_ROUTE } from 'route'
import AppContainer from 'components/UI/AppContainer'
import AppBox from 'components/UI/AppBox'
import LeftMenu from './components/LeftMenu'

const RightIcon = dynamic(() => import('./components/RightIcon'))

interface HeaderProps {
  authenticated: boolean
}

export default function Header({ authenticated }: HeaderProps): JSX.Element {
  const classes = useStyles()
  const { route } = useRouter()

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <AppContainer>
        <AppBox justifyContent="space-between">
          <LeftMenu />
          {route !== LOGIN_IN_ROUTE && <RightIcon authenticated={authenticated} />}
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
