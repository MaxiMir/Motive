import { AppBar, Container, Stack, GlobalStyles } from '@mui/material'
import dynamic from 'next/dynamic'
import { useViewer } from 'entities/viewer'
import { OGType } from 'shared/api'
import { Sidebar } from './sidebar'

const Updating = dynamic(() => import('./updating'))
const SignIn = dynamic(() => import('./signIn'))
const Notifications = dynamic(() => import('./notifications'))
const ProfileLink = dynamic(() => import('./profileLink'))

const HEIGHT = 56

interface HeaderMobileProps {
  type: OGType
  fixed: boolean
  updating: boolean
}

function HeaderMobile({ type, fixed, updating }: HeaderMobileProps) {
  const viewer = useViewer()
  const renderProfileLink = type === 'profile' && !updating

  return (
    <AppBar
      position="fixed"
      sx={{
        display: {
          xs: 'block',
          xl: 'none',
        },
        top: fixed ? 0 : -HEIGHT,
        height: HEIGHT,
        paddingY: 1,
        boxShadow: 'none',
        backgroundColor: '#121212',
        transition: 'top 0.3s ease-in-out',
      }}
    >
      <Container fixed>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Sidebar />
          {updating ? <Updating /> : <>{renderProfileLink && <ProfileLink />}</>}
          {viewer ? <Notifications /> : <SignIn />}
        </Stack>
      </Container>
      <GlobalStyles
        styles={{
          main: {
            paddingTop: HEIGHT,
          },
        }}
      />
    </AppBar>
  )
}

export default HeaderMobile
