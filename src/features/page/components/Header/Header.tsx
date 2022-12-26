import dynamic from 'next/dynamic'
import { Box, AppBar, Container } from '@mui/material'
import { UserPageDto } from '@features/page'
import LeftMenu from './components/LeftMenu'

const SignIn = dynamic(() => import('./components/SignIn'))
const Notifications = dynamic(() => import('./components/Notifications'))
const Nickname = dynamic(() => import('./components/Nickname'))
const UserMenu = dynamic(() => import('./components/UserMenu'))

interface HeaderProps {
  authenticated: boolean
  user?: UserPageDto
}

function Header({ authenticated, user }: HeaderProps) {
  return (
    <AppBar
      position="static"
      sx={{
        paddingY: 1,
        backgroundColor: 'underlay',
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
          {user && <Nickname nickname={user.nickname} />}
          <Box display="flex" alignItems="center" gap={1}>
            {authenticated ? <Notifications /> : <SignIn />}
            {user && <UserMenu id={user.id} name={user.name} />}
          </Box>
        </Box>
      </Container>
    </AppBar>
  )
}

export default Header
