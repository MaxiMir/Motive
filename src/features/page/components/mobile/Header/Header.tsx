import dynamic from 'next/dynamic'
import { AppBar, Box, Container } from '@mui/material'
import { OGType } from '@features/page'
import useClient from '@hooks/useClient'
import Navigation from './components/Navigation'

const SignIn = dynamic(() => import('./components/SignIn'))
const Notifications = dynamic(() => import('./components/Notifications'))
const UserLink = dynamic(() => import('./components/UserLink'))

interface HeaderProps {
  type: OGType
}

function Header({ type }: HeaderProps) {
  const client = useClient()
  const renderNickname = type === OGType.Profile

  return (
    <AppBar
      position="static"
      sx={{
        paddingY: 1,
        boxShadow: 'none',
        backgroundColor: 'underlay',
      }}
    >
      <Container fixed>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Navigation />
          {renderNickname && <UserLink />}
          {client ? <Notifications /> : <SignIn />}
        </Box>
      </Container>
    </AppBar>
  )
}

export default Header
