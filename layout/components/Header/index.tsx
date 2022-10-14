import dynamic from 'next/dynamic'
import { Box, AppBar, Container } from '@mui/material'
import LeftMenu from './components/LeftMenu'

const SignIn = dynamic(() => import('./components/SignIn'))
const Notifications = dynamic(() => import('./components/Notifications'))

interface HeaderProps {
  authenticated: boolean
}

export default function Header({ authenticated }: HeaderProps) {
  return (
    <AppBar
      position="static"
      className="apple-hide"
      sx={{
        paddingY: 1,
        backgroundColor: 'navigation',
        backgroundImage: 'none',
        boxShadow: 'none',
      }}
    >
      <Container fixed>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <LeftMenu />
          {authenticated ? <Notifications /> : <SignIn />}
        </Box>
      </Container>
    </AppBar>
  )
}
