import dynamic from 'next/dynamic'
import { AppBar, Container, Stack } from '@mui/material'
import { OGType } from '@features/page'
import useClient from '@hooks/useClient'
import Sidebar from './components/Sidebar'

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
