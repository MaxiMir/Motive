import { AppBar, Container, Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import { useViewer } from 'entities/viewer'
import { OGType } from 'shared/api'
import { Sidebar } from './sidebar'

const SignIn = dynamic(() => import('./signIn'))
const Notifications = dynamic(() => import('./notifications'))
const UserLink = dynamic(() => import('./userLink'))

interface HeaderMobileProps {
  type: OGType
}

function HeaderMobile({ type }: HeaderMobileProps) {
  const viewer = useViewer()
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
          {viewer ? <Notifications /> : <SignIn />}
        </Stack>
      </Container>
    </AppBar>
  )
}

export default HeaderMobile
