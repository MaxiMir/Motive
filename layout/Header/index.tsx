import dynamic from 'next/dynamic'
import { AppBar, Chip, useTheme } from '@mui/material'
import AppContainer from 'components/UI/AppContainer'
import AppBox from 'components/UI/AppBox'
import LeftMenu from './components/LeftMenu'

const SignIn = dynamic(() => import('./components/SignIn'))
const Notification = dynamic(() => import('./components/Notification'))

interface HeaderProps {
  authenticated: boolean
}

export default function Header({ authenticated }: HeaderProps): JSX.Element {
  const theme = useTheme()

  return (
    <AppBar
      position="sticky"
      sx={{
        padding: '16px 0 8px',
        flexGrow: 1,
        backgroundColor: theme.block.menu,
        backgroundImage: 'none',
        boxShadow: 'none',
      }}
    >
      <AppContainer>
        <AppBox justifyContent="space-between" alignItems="center">
          <LeftMenu />
          <Chip label="Beta 1.0.4" variant="outlined" />
          {authenticated ? <Notification /> : <SignIn />}
        </AppBox>
      </AppContainer>
    </AppBar>
  )
}
