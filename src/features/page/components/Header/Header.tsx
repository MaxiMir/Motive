import dynamic from 'next/dynamic'
import { Box, AppBar, Container } from '@mui/material'
import { UserPageDto } from '@features/page'
import LeftMenu from './components/LeftMenu'

const SignIn = dynamic(() => import('./components/SignIn'))
const Notifications = dynamic(() => import('./components/Notifications'))
const UserLink = dynamic(() => import('./components/UserLink'))

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
          {user && <UserLink nickname={user.nickname} />}
          {authenticated ? <Notifications /> : <SignIn />}
        </Box>
      </Container>
    </AppBar>
  )
}

export default Header
