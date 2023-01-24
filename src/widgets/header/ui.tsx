import dynamic from 'next/dynamic'
import { AppBar, Container, Stack } from '@mui/material'
import { OGType } from '@entities/pages'
import useClient from '@hooks/useClient'
import Sidebar from './ui/sidebar/Sidebar'

const SignIn = dynamic(() => import('./ui/signIn/SignIn'))
const Notifications = dynamic(() => import('./ui/notifications/Notifications'))
const UserLink = dynamic(() => import('./ui/UserLink'))

interface HeaderProps {
  type: OGType
}

function Header({ type }: HeaderProps) {
  const client = useClient()
  const renderNickname = type === 'profile'

  return (
    <AppBar
      position="static"
      sx={{
        display: {
          xs: 'block',
          xl: 'none',
        },
        paddingY: 1,
        boxShadow: 'none',
        backgroundColor: 'underlay',
      }}
    >
      <Container fixed>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Sidebar />
          {renderNickname && <UserLink />}
          {client ? <Notifications /> : <SignIn />}
        </Stack>
      </Container>
    </AppBar>
  )
}

export default Header
