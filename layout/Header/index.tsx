import dynamic from 'next/dynamic'
import { AppBar, Chip, Container } from '@mui/material'
import AppBox from 'components/UI/AppBox'
import LeftMenu from './components/LeftMenu'

const SignIn = dynamic(() => import('./components/SignIn'))
const Notification = dynamic(() => import('./components/Notification'))

interface HeaderProps {
  authenticated: boolean
}

export default function Header({ authenticated }: HeaderProps): JSX.Element {
  return (
    <AppBar
      position="sticky"
      sx={{
        padding: '16px 0 8px',
        flexGrow: 1,
        backgroundColor: 'navigation',
        backgroundImage: 'none',
        boxShadow: 'none',
      }}
    >
      <Container fixed>
        <AppBox justifyContent="space-between" alignItems="center">
          <LeftMenu />
          <Chip label="Alpha 1.0.4" variant="outlined" />
          {authenticated ? <Notification /> : <SignIn />}
        </AppBox>
      </Container>
    </AppBar>
  )
}
