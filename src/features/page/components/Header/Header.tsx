import dynamic from 'next/dynamic'
import { AppBar, Box, Container } from '@mui/material'
import { OGType } from '@features/page'
import useClient from '@hooks/useClient'
import LeftMenu from './components/LeftMenu'

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
          {renderNickname && <UserLink />}
          {client ? <Notifications /> : <SignIn />}
        </Box>
      </Container>
    </AppBar>
  )
}

export default Header
