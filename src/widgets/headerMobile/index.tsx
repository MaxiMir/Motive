import { AppBar, Container, GlobalStyles, Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import { useViewer } from 'entities/viewer'
import { OGType } from 'shared/api'
import { Sidebar } from './sidebar'

const SignIn = dynamic(() => import('./signIn'))
const Notifications = dynamic(() => import('./notifications'))
const UserLink = dynamic(() => import('./userLink'))

const HEIGHT = 56

interface HeaderMobileProps {
  type: OGType
  scrolledUp: boolean
}

function HeaderMobile({ type, scrolledUp }: HeaderMobileProps) {
  const viewer = useViewer()
  const renderNickname = type === 'profile'

  return (
    <AppBar
      position="fixed"
      sx={{
        display: {
          xs: 'block',
          xl: 'none',
        },
        top: scrolledUp ? 0 : -HEIGHT,
        height: HEIGHT,
        paddingY: 1,
        boxShadow: 'none',
        backgroundColor: '#121212',
        transition: 'top 0.2s ease-in-out',
      }}
    >
      <Container fixed>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Sidebar />
          {renderNickname && <UserLink />}
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
