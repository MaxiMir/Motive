import dynamic from 'next/dynamic'
import { Box, AppBar, Container } from '@mui/material'
import LeftMenu from './components/LeftMenu'

const SignIn = dynamic(() => import('./components/SignIn'))
const Notifications = dynamic(() => import('./components/Notifications'))
const Nickname = dynamic(() => import('./components/Nickname'))

interface HeaderProps {
  authenticated: boolean
  nickname: boolean
}

function Header({ authenticated, nickname }: HeaderProps) {
  return (
    <AppBar
      position="static"
      sx={{
        paddingY: 1,
        backgroundColor: 'navigation',
        backgroundImage: 'none',
        boxShadow: 'none',
      }}
    >
      <Container
        fixed
        sx={(theme) => ({
          [theme.breakpoints.only('xl')]: {
            maxWidth: 900,
          },
        })}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <LeftMenu />
          {nickname && <Nickname />}
          {authenticated ? <Notifications /> : <SignIn />}
        </Box>
      </Container>
    </AppBar>
  )
}

export default Header
