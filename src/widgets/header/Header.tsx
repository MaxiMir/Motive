import { AppBar, Container, Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import { OGType } from '@shared/api/pages'
import { useClient } from '@entities/user'
import { Sidebar } from './ui'

const SignIn = dynamic(() => import('./ui').then((m) => m.SignIn))
const Notifications = dynamic(() => import('./ui').then((m) => m.Notifications))
const UserLink = dynamic(() => import('./ui').then((m) => m.UserLink))

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
